import { connect } from "react-redux";

import Table from "presentational/Table";
import Buttons from "presentational/Buttons";
import Dashboard from "presentational/Dashboard";
import Modal from "presentational/Modal";
import Header from "presentational/Header";

import { buttonClick, closeModal, openModal, refreshData } from "./actions";

export const createTable = () => {
  const mapStateToProps = (state, ownProps) => ({
    ...state,
    table: state.longestCommonSubstringReducer.table,
    styles: state.longestCommonSubstringReducer.styles
  });
  return connect(mapStateToProps, {})(Table);
};

export const createDashboard = () => {
  const mapStateToProps = (state, ownProps) => ({
    ...state,
    score: state.longestCommonSubstringReducer.score,
    errors: state.longestCommonSubstringReducer.errors,
    steps: state.longestCommonSubstringReducer.steps
  });
  const mapDispatchToProps = dispatch => ({
    onClick: () => {
      dispatch(refreshData());
    }
  });
  return connect(mapStateToProps, mapDispatchToProps)(Dashboard);
};

export const createButtons = () => {
  const mapStateToProps = state => ({
    ...state,
    buttons: state.longestCommonSubstringReducer.buttons
  });
  const mapDispatchToProps = dispatch => ({
    onClick: buttonValue => {
      dispatch(buttonClick(buttonValue));
    }
  });
  return connect(mapStateToProps, mapDispatchToProps)(Buttons);
};

export const createModal = () => {
  const mapStateToProps = state => ({
    ...state,
    showModal: state.longestCommonSubstringReducer.showModal,
    closeModal: state.longestCommonSubstringReducer.closeModal,
    modalTitle: state.longestCommonSubstringReducer.modalTitle,
    modalBody: state.longestCommonSubstringReducer.modalBody
  });
  const mapDispatchToProps = dispatch => ({
    closeModal: () => {
      dispatch(closeModal());
    }
  });
  return connect(mapStateToProps, mapDispatchToProps)(Modal);
};

export const createHeader = () => {
  const mapStateToProps = state => ({
    ...state,
    title: state.longestCommonSubstringReducer.title,
    openModal: state.longestCommonSubstringReducer.openModal,
    count: state.longestCommonSubstringReducer.count
  });
  const mapDispatchToProps = dispatch => {
    dispatch({ type: "GET_LONGEST_COMMON_SUBSTRING_COUNT" });
    return { openModal: () => dispatch(openModal()) };
  };
  return connect(mapStateToProps, mapDispatchToProps)(Header);
};
