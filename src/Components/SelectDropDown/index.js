import React, { useEffect, useRef, useState } from "react";
import classes from "./index.module.scss";
import {Form} from "react-bootstrap";

const Icon = () => {
    return (
        <svg height="20" width="20" viewBox="0 0 20 20">
            <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
        </svg>
    );
};

const CloseIcon = () => {
    return (
        <i className={"fal fa-times"}></i>
    );
};

const SelectDropDown = ({
        placeHolder,
        options,
        isMulti,
        isSearchable,
        onChange,
        disabled,
        small,

    }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [selectedValue, setSelectedValue] = useState(isMulti ? [] : null);
    const [searchValue, setSearchValue] = useState("");
    const searchRef = useRef();
    const inputRef = useRef();

    useEffect(() => {
        setSearchValue("");
        if (showMenu && searchRef.current) {
            searchRef.current.focus();
        }
    }, [showMenu]);

    useEffect(() => {
        const handler = (e) => {
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        window.addEventListener("click", handler);
        return () => {
            window.removeEventListener("click", handler);
        };
    });
    const handleInputClick = (e) => {
        setShowMenu(!showMenu);
    };

    const getDisplay = () => {
        if (!selectedValue || selectedValue.length === 0) {
            return placeHolder;
        }
        if (isMulti) {
            return (
                <div className={classes.dropdownTags}>
                    {selectedValue.map((option) => (
                        <div key={option.value} className={classes.dropdownTagItem}>
                            {option.label}
                            <span
                                onClick={(e) => onTagRemove(e, option)}
                                className={classes.dropdownTagClose}
                            >
                                <CloseIcon />
                            </span>
                        </div>
                    ))}
                </div>
            );
        }
        return selectedValue.label;
    };

    const removeOption = (option) => {
        return selectedValue.filter((o) => o.value !== option.value);
    };

    const onTagRemove = (e, option) => {
        e.stopPropagation();
        const newValue = removeOption(option);
        setSelectedValue(newValue);
        onChange(newValue);
    };

    const onItemClick = (option) => {
        let newValue;
        if (isMulti) {
            if (selectedValue.findIndex((o) => o.value === option.value) >= 0) {
                newValue = removeOption(option);
            } else {
                newValue = [...selectedValue, option];
            }
        } else {
            newValue = option;
        }
        setSelectedValue(newValue);
        onChange(newValue);
    };

    const isSelected = (option) => {
        if (isMulti) {
            return selectedValue.filter((o) => o.value === option.value).length > 0;
        }

        if (!selectedValue) {
            return false;
        }

        return selectedValue.value === option.value;
    };

    const onSearch = (e) => {
        setSearchValue(e.target.value);
    };

    const getOptions = () => {
        if (!searchValue) {
            return options;
        }

        return options.filter(
            (option) =>
                option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
        );
    };

    return (
        <div className={`${classes.dropdownContainer} ${disabled ? 'disabled' : ''} ${small ? `${classes.small}` : ''} `}>
            <div ref={inputRef} onClick={handleInputClick} className={classes.dropdownInput}>
                <div className={classes.dropdownSelectedValue}>{getDisplay()}</div>
                <div className={classes.dropdownTools}>
                    <div className={classes.dropdownTool}>
                        <Icon />
                    </div>
                </div>
            </div>
            {showMenu && (
                <div className={classes.dropdownMenu}>
                    {isSearchable && (
                        <div className={classes.searchBox}>
                            <Form.Control onChange={onSearch} value={searchValue} ref={searchRef}  />
                        </div>
                    )}
                    {
                    getOptions()? getOptions()?.map((option) => (
                        <div
                            onClick={() => onItemClick(option)}
                            key={option.value}
                            className={`${classes.dropdownItem} ${isSelected(option) && `${classes.selected}`}`}
                        >
                            {option.label}
                        </div>
                    )): <div>You have no connections</div>
                    }
                </div>
            )}
        </div>
    );
};

export default SelectDropDown;
