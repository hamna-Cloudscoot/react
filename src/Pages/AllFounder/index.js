import React, { useEffect, useState } from "react";
import PageTitle from "../../Components/PageTitle";
import { Container, Tabs, Tab } from "react-bootstrap";
import ColBox from "../../Components/ColBox";
import SearchBar from "../../Components/SearchBar";
import UserAPIs from 'APIs/user'
import Enums from 'config/enums'
import { useDispatch, useSelector } from "react-redux";
import { setAllProfessionalPageActiveTab } from "redux/reducers/professionalPage";

const AllFounder = (props) => {
  const dispatch = useDispatch()

  const { activeTab } = useSelector((state) => state.professionalLandingPage);
  const [lawyers, setLawyers] = useState([]);
  const [founders, setFounders] = useState([]);
  const [accountants, setAccountants] = useState([]);
  const [co_founders, setCo_founders] = useState([]);

  const [searchedValue, setSearchedValue] = useState('');
  const { user } = useSelector((state) => state.user);
  const [key, setKey] = useState(Enums.ProfessionalTabsEventKeyNameEnum.founder);

  const setActiveTab = (selected) => {
    setKey(selected)
    dispatch(
      setAllProfessionalPageActiveTab({
        activeTab: selected,
      })
    );
  }

  const getLawyers = async (search = null) => {
    const lawyer = await UserAPIs.getLawyers(search?.trim(), user?.id)
    if (lawyer) {
      setLawyers(lawyer.data.data);
    }
  }

  const getFounders = async (search = null) => {
    const founder = await UserAPIs.getFounders(search?.trim(), user?.id);
    if (founder) {
      setFounders(founder.data.data);
    }
  }

  const getCoFounders = async (search = null) => {
    const co_founder = await UserAPIs.getCo_Founder(search?.trim(), user?.id);
    if (co_founder) {
      setCo_founders(co_founder.data.data);
    }
  }

  const getAccountants = async (search = null) => {
    const accountant = await UserAPIs.getAccountant(search?.trim(), user?.id);
    if (accountant) {
      setAccountants(accountant.data.data);
    }
  }

  const getLawyersAndFounders = async () => {
    await getFounders()
    await getCoFounders()
    await getLawyers()
    await getAccountants()
  }

  const getSearchedResults = async (search) => {
    let results;
    switch (key) {

      case Enums.ProfessionalTabsEventKeyNameEnum.founder:
        const filterData = founders.filter(admin => {
          const fullName = admin.firstName + ' ' + admin.lastName;
          const searchedValueLower = search.toLowerCase();
          return fullName.toLowerCase().includes(searchedValueLower);
        })
        setFounders(filterData);
        break;

      case Enums.ProfessionalTabsEventKeyNameEnum.coFounder:

        const filteredCo = co_founders.filter(admin => {
          const fullName = admin.firstName + ' ' + admin.lastName;
          const searchedValueLower = search.toLowerCase();
          return fullName.toLowerCase().includes(searchedValueLower);
        })
        if (filteredCo) {
          setCo_founders(filteredCo)
        }
        break;

      case Enums.ProfessionalTabsEventKeyNameEnum.lawyer:

        const filteredlawyer = lawyers.filter(admin => {
          const fullName = admin.firstName + ' ' + admin.lastName;
          const searchedValueLower = search.toLowerCase();
          return fullName.toLowerCase().includes(searchedValueLower);
        })
        if (filteredlawyer) {
          setLawyers(filteredlawyer)
        }
        break;

      case Enums.ProfessionalTabsEventKeyNameEnum.accountant:
        const filteredAccountant = accountants.filter(admin => {
          const fullName = admin.firstName + ' ' + admin.lastName;
          const searchedValueLower = search.toLowerCase();
          return fullName.toLowerCase().includes(searchedValueLower);
        })
        if (filteredAccountant) {
          setAccountants(filteredAccountant)
        }
        break;
    }
  }

  useEffect(() => {
    setActiveTab(activeTab ? activeTab : Enums.ProfessionalTabsEventKeyNameEnum.founder)
    getLawyersAndFounders();
  }, [])


  return (
    <>
      <PageTitle title={"All Professional"} />
      <section className={"p-0 pb-3"}>
        <Container>
          {/* <SearchBar placeholder={"Search Professional"} /> */}
          <SearchBar placeholder={"Search Professional"} searchFor={'professionals'} getDataMethod={getLawyersAndFounders} getSearchedMethod={getSearchedResults} searchedValue={searchedValue} setSearchedValue={setSearchedValue} />
          <Tabs
            // defaultActiveKey={Enums.ProfessionalTabsEventKeyNameEnum.founder}
            activeKey={key}
            onSelect={(k) => setActiveTab(k)}
            justify
          >
            <Tab eventKey={Enums.ProfessionalTabsEventKeyNameEnum.founder} title="Founder">
              <div className={`colList`}>
                {founders.length && founders.map((data) => (
                  <ColBox data={data} />
                )) ||
                  <p className="py-5 text-center w-100">No Founder exist.</p>}
              </div>
            </Tab>
            <Tab eventKey={Enums.ProfessionalTabsEventKeyNameEnum.coFounder} title="Co-Founder">
              <div className={`colList`}>
                {co_founders.length && co_founders.map((data) => (
                  <ColBox data={data} />
                )) ||
                  <p className="py-5 text-center w-100">No Co-founder exist.</p>}
              </div>
            </Tab>
            <Tab eventKey={Enums.ProfessionalTabsEventKeyNameEnum.lawyer} title="Lawyer">
              <div className={`colList`}>
                {console.log("lawyers", lawyers)}
                {lawyers.length && lawyers.map((data) => (
                  <ColBox data={data} />
                ))
                  ||
                  <p className="py-5 text-center w-100">No Lawyer exist.</p>
                }
              </div>
            </Tab>
            <Tab eventKey={Enums.ProfessionalTabsEventKeyNameEnum.accountant} title="Accountant">
              <div className={`colList`}>
                {accountants.length && accountants.map((data) => (
                  <ColBox data={data} />
                )) || <p className="py-5 text-center w-100">No Accountant exist.</p>}
              </div>
            </Tab>
          </Tabs>
        </Container>
      </section>
    </>
  );
};

export default AllFounder;
