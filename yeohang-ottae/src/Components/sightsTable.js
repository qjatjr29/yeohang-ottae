import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const TR = styled.tr`
`;
const TD = styled.td``;


const SightsTable = ({ name, location }) => (
    <>

        <TR>
            <TD>{name}</TD>
            <TD>{location}</TD>
        </TR >
    </>
);



SightsTable.propTypes = {
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
}

export default SightsTable;