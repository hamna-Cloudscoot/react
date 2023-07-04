import Invitation from 'Components/Invitation'
import MeetingCard from 'Components/MeetingCard'
import PageTitle from 'Components/PageTitle'
import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'

const MeetingRoom = () => {
  return (
    <>
            <section className={"section p-0"}>
                <Container>
                    <Row>
                        <Col md={12} className={'p-0'}>
                            <PageTitle smallerText={"Virtual"} title={"Boardroom"} bgWhite onlyTitle smallText />
                        </Col>
                        
                    </Row>
                </Container>
            </section>

            <section>
                <Container>
                    <Card>
                    <Row>
                        <Col md={8}>
                        <MeetingCard meetingRoom />
                        </Col>
                        <Col md={4}>
                            <Invitation/>
                        </Col>
                    </Row>
                    </Card>
                </Container>
            </section>
           
        </>
    
  )
}

export default MeetingRoom