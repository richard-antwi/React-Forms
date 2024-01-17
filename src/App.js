//  import './App.css';
//  import Form from './components/Form';
// // import Example from './components/Form';
// // function App() {
// //   return (
// //     <div className="App">
     
// //       <Example></Example>
// //     </div>
// //   );
// // }
// //   export default App; 


// import App from './App'
// import React, { useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import ReactDOM from 'react-dom';

// ReactDOM.render(<App />, document.getElementById('root')); 

// function Example() {
//   const [smShow, setSmShow] = useState(false);
//   const [lgShow, setLgShow] = useState(false);

//   return (
//     <>
//       <Button onClick={() => setSmShow(true)} className="me-2">
//         Small modal
//       </Button>
//       <Button onClick={() => setLgShow(true)}>Large modal</Button>
//       <Modal
//         size="sm"
//         show={smShow}
//         onHide={() => setSmShow(false)}
//         aria-labelledby="example-modal-sizes-title-sm"
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="example-modal-sizes-title-sm">
//             Small Modal
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>...</Modal.Body>
//       </Modal>
//       <Modal
//         size="lg"
//         show={lgShow}
//         onHide={() => setLgShow(false)}
//         aria-labelledby="example-modal-sizes-title-lg"
//       >
//       <p>Hello</p>
//         <Modal.Header closeButton>
//           <Modal.Title id="example-modal-sizes-title-lg">
//             Large Modal
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>...</Modal.Body>
//       </Modal>
//     </>
//   )
// };

// export default Example;




 import { Link } from "react-router-dom";

import React from "react";
import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import back from './img1.jpg';
import MUIDataTable from "mui-datatables";
import axios from "axios";

export default function Modal({
  showModal,
  setShowModal,
  showTable,
  setShowTable,
  handleSubmit,
  val,
  value,
  setVal,
  sm,
}) {
  const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modal = {
    visible: {
      y: "50px",
      opacity: 1,
      transition: {
        delay: 0.5,
        // ease: "easeInOut"
      },
    },
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
  };
  const columns = [
    "Change Code",
    "Fee Amount",
    "Fee Amount Description",
    "Fee Description",
    "Fee Amount Per Book",
    "Currency",
  ];

  // const data = [
  //  ["Joe James", "Test Corp", "Yonkers", "NY", "Ghs 20", "Ghs"],
  // ];

  const options = {
    filterType: "checkbox",
  };
  const [input, setInput] = useState(null);
  const [vue, setVue] = useState(null);
  function handleChange(e) {
    setInput({ [e.target.name]: e.target.value });
  }

  function handleBlur() {
    axios.post("http://localhost:4000/account", input).then((res) => {
      //   localStorage.setItem("code", JSON.stringify(res.data));
      console.log(res.data);
      setVue(res.data);
      // vue = res.data
    });

    // const vars = localStorage.getItem("code");
    // console.log("vars", vars);
  }

  console.log(input);
  return (
    <AnimatePresence
      exitBeforeEnter
      onExitComplete={() => {
        setShowTable(false);
        setVal(null);
      }}
    >
      {showModal && (
        <motion.div
          className="bg-[#413f3f70] fixed top-0 bottom-0 h-screen w-screen  z-10 overflow-y-scroll "
          variants={backdrop}
          animate="visible"
          initial="hidden"
          exit="hidden"
          // onClick={()=>{setShowModal(false)}}
        >
          <motion.div
            className="max-w-[1050px] min-h-[415px] text-gray-900 rounded m-auto bg-white py-3 px-2"
            variants={modal}
          >
            <div className="flex flex-col">
              <div className="flex w-full my-1">
                <h1 className="font-bold">CHEQUE BOOK REQUISITION </h1>
                <div className=" ml-12 flex text-sm font-semibold items-start ">
                  <label htmlFor="accountNo">Request ID : </label>
                  <input
                    type="text"
                    disabled
                    value={val && val.requestID}
                    className="bg-gray-200 ml-3 px-2 w-24 rounded"
                  />
                </div>
              </div>
              <form
                onSubmit={handleSubmit}
                style={{ backgroundImage: `url(${back})` }}
                className="min-h-[240px] mb-5 p-2 w-full md:flex lg:flex   text-sm"
              >
                <div className="lg:w-1/3 md:w-1/3 sm:w-full sm:mb-2 mb-2 w-full  bg-white mr-2 h-full px-2 py-2 rounded-sm border border-double">
                  <div className="mb-4 h-1/3">
                    <label htmlFor="accountNo">
                      Account Number <span className="text-red-700">*</span>
                    </label>
                    <div className="flex w-full">
                      <input
                        type="text"
                        name="AC_VAL_PASSED"
                        id="acc"
                        className="mr-1 w-1/2 bg-blue-200 focus:outline-none border-b-2 border-blue-600 "
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        disabled
                        className="bg-gray-200 py-1 w-1/2 rounded"
                      />
                    </div>
                  </div>
                  <div className="mb-4 h-1/3">
                    <label htmlFor="accountNo">Channel ID</label>
                    <input
                      type="text"
                      disabled
                      value={value && val.channelID}
                      className="bg-gray-200 py-1 w-full block rounded"
                    />
                  </div>
                  <div className="mb-[5.25rem] h-1/3">
                    <label htmlFor="accountNo">Currency</label>
                    <input
                      type="text"
                      disabled
                      value={val && val.currency}
                      className="bg-gray-200 py-1 w-full block rounded"
                    />
                  </div>
                </div>
                <div className="lg:w-[41%] md:w-[41%] sm:w-full sm:mb-2 mb-2 w-full h-full bg-white px-2 py-2 pb-4 rounded border ">
                  <div className="mb-4 h-1/4">
                    <label htmlFor="accountNo">Document Number</label>
                    <div className="flex w-full">
                      <input
                        type="text"
                        name="accountNo"
                        className="mr-1 w-[57%] py-1 border-b-2 border-blue-600 bg-blue-200 focus:outline-none "
                      />
                      <button className=" w-[41%] p-1 font-semibold bg-blue-700 text-white rounded-sm">
                        View document
                      </button>
                    </div>
                  </div>
                  <div className="mb-4 h-1/4 flex">
                    <div className="w-[60%]">
                      <label htmlFor="accountNo">
                        Number of Leaves{" "}
                        <span className="text-red-700 ">*</span>
                      </label>
                      <div className="w-full flex">
                        <input
                          type="text"
                          disabled
                          className="bg-gray-200 py-1 w-[29%] block rounded"
                        />
                        <button className="">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-8"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2h-1.528A6 6 0 004 9.528V4z" />
                            <path
                              fillRule="evenodd"
                              d="M8 10a4 4 0 00-3.446 6.032l-1.261 1.26a1 1 0 101.414 1.415l1.261-1.261A4 4 0 108 10zm-2 4a2 2 0 114 0 2 2 0 01-4 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        <input
                          type="text"
                          disabled
                          className="bg-gray-200 py-1 w-3/5 block rounded"
                        />
                      </div>
                    </div>
                    <div className="w-[40%] ml-1">
                      <div className="mb-2 ">
                        <label htmlFor="accountNo">Number of books</label>
                        <input
                          type="text"
                          disabled
                          className="bg-gray-200 py-1 w-full block rounded"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 h-1/4">
                    <label htmlFor="accountNo">Delivery Channel</label>
                    <select
                      name=""
                      id=""
                      className="w-3/4 py-1  border rounded block"
                    ></select>
                  </div>
                  <div className=" h-1/4">
                    <label htmlFor="accountNo">Delivery Branch</label>
                    <input
                      type="text"
                      disabled
                      value={val && val.deliveryBranch}
                      className="bg-gray-200 w-full py-1 block rounded"
                    />
                  </div>
                </div>
                <div className="lg:w-[25%] md:w-[25%] sm:w-full sm:mb-2 mb-2 w-full  px-2 py-2 lg:ml-2 md:ml-2 bg-gray-400 rounded border ">
                  <div className="mb-2">
                    <label htmlFor="accountNo">Source Branch</label>
                    <input
                      type="text"
                      disabled
                      value={vue && vue[0][13]}
                      className="bg-gray-200 px-2 text-purple-800 w-full block rounded"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="accountNo">Available Balance</label>
                    <input
                      type="text"
                      disabled
                      value={vue && vue[0][1]}
                      className="bg-gray-200 px-2 text-purple-800 w-full block rounded"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="accountNo">Ledger Balance</label>
                    <input
                      type="text"
                      disabled
                      value={val && val.LedgerBalance}
                      className="bg-gray-200 px-2 text-purple-800 w-full block rounded"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="accountNo">Available Limit</label>
                    <input
                      type="text"
                      disabled
                      value={val && val.AvailableLimit}
                      className="bg-gray-200 px-2 text-purple-800 w-full block rounded"
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="accountNo">Account Status</label>
                    <input
                      type="text"
                      disabled
                      value={val && val.AccountStatus}
                      className="bg-gray-200 px-2 text-purple-800 w-full block rounded"
                    />
                  </div>
                </div>
              </form>
              <hr />
              
              {showTable && (
                <motion.div initial={{ y: "-80px" }} animate={{ y: "0px" }}>
                  <MUIDataTable
                    className="text-xs"
                    title={"Cheque Book Requisition"}
                    data={value}
                    columns={columns}
                    options={options}
                  />
                </motion.div>
              )}

              <div className="w-full flex justify-end mt-4 ">
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setShowModal(false);
                  }}
                  className="w-1/6  text-center hover:bg-red-900 cursor-pointer px-3 py-2 bg-red-700 rounded text-white font-semibold"
                >
                  Close
                </motion.div>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="w-1/6  text-center hover:bg-green-700 ml-3 cursor-pointer px-3 py-2 bg-green-500 rounded text-white font-semibold"
                >
                  Submit
                </motion.div>
              </div>
            </div>
            <button
              onClick={() => {
                setShowModal(false);
              }}
              className="text-black absolute top-1 right-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}






//Backend
const express = require('express');
const oracledb = require('oracledb'); 
const app = express();

app.use(express.json());
app.post('/account', (req, res) => {

  const AC_VAL_PASSED = "'"+req.body.AC_VAL_PASSED+"'"
  console.log(AC_VAL_PASSED)

  async function getCodescs(){

    let con;
    
    try { 
    
    con = await oracledb.getConnection({
      user : "BANOWNER",
      password: "1234",
      connectString : "192.168.1.60:9534/UNS"
    });
    
    const data = await con.execute(
      `SELECT 
      ACCT_LINK, AV_BAL, BOOKBAL, 
         OD_LIM, POST_AV_BAL, POST_BOOKBAL, 
         POST_OD_LIM, SYSPOST_AV_BAL, UNCLEARED_BAL, 
         ACCOUNT_NUMBER, ACCOUNT_DESCRP, POST_ACCT_DESCRP, 
         BRANCH_CODE, BRDESC, STATUS_INDICATOR, 
         STATUS_DESC, CURRENCY_CODE, LFM_TEMP, 
         MAX_DEPO_AMT, DEPO_ALLOW, MAX_WITHD_AMT, 
         WITHD_ALLOW, PROD_CODE, UNAUTH_OD, 
         CHQ_ALLOWED, CHQ_DEPO_ALLOW, TYPE_OF_ACCT, 
         LEGAL_FORM, CUST_NO, CASH_FLAG, 
         CHQ_FLAG, ACR_CHG, ACR_PENAL, 
         ACR_INT, VIEW_FLAG
      FROM BANKOWNER.VW_CASA_LEDGER
      WHERE ACCT_LINK = ${AC_VAL_PASSED} `,
    );
    
      if (data) {
        res.status(200).send(data.rows);
      } else {
        res.status(500).send('No record found')
      }
    


    // localStorage.getItem("codescs");
    
    } catch (err){
      res.send(err);
    }
    
    }
    
    getCodescs();
});
// Start your Express.js server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});