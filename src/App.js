import React from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Message from './Activity/Message';
import Pending from './Activity/Pending';
import Ok from './Activity/Ok';
import Err from './Activity/Err';
import Start from './Start';
import SecondPage from './SecondPage';


export default function App() {
  const [actionHistory, setActionHistory] = React.useState([]);                                         // For the Notifications drop-down. But now we only have this in Admin

  function initContract() {
    const args = {
      owner_id: "owner",
      admin: "admin"
    }
    window.contract.new_default_meta(args)                                                            // This could be 'new' for user provided init, we are using default
      .then((msg) => console.log("Initialized! ", msg))
      .catch((err) => console.error(err));
  }
  
  function newAction(actionObj) {
    //FireToast conditionally
    if (actionObj.thePromise) {
      toast.promise(
        actionObj.thePromise,
        {
          pending: {
            render() {
              return <div className="toastMargin"><Message title={actionObj.pendingPromiseTitle} desc={actionObj.pendingPromiseDesc} /></div>;
            }, 
            icon: <Pending />
          },
          success: {
            render({data}) {
              console.log("data", data)
              return <div className="toastMargin"><Message title={actionObj.successPromiseTitle} desc={actionObj.successPromiseDesc} /></div>
            },
            icon: <Ok />
          },
          error: {
            render({data}) {
              console.log("data", data)
              return <div className="toastMargin"><Message title={actionObj.errorPromiseTitle} desc={actionObj.errorPromiseDesc} /></div>
            },
            icon: <Err />
          }
        },
      ) // We set the history messages here
        .then(() => setActionHistory((prevArray) => {
          prevArray.push({ successMsg: actionObj.successPromiseTitle, successMsgDesc: actionObj.successPromiseDesc });
          return [...prevArray];
        }))
        .catch(() => setActionHistory((prevArray) => {
          prevArray.push({errorMsg: actionObj.errorPromiseTitle, errorMsgDesc: actionObj.errorPromiseDesc});
          return [...prevArray];
        }))
    } else {
      if (actionObj.errorMsg) toast.warn(actionObj.errorMsg);
      if (actionObj.successMsg) toast.success(actionObj.successMsg);
      if (actionObj.infoMsg) toast.info(actionObj.infoMsg);

      setActionHistory((prevArray) => {
        prevArray.push(actionObj);
        return [...prevArray];
      });
    }
  }

  //<ToastContainer hideProgressBar={true} position="bottom-right" transition={Slide} />
  
  return (
    <HashRouter>
      <Routes>
        <Route 
          exact
          path='/'
          element={<Navigate replace to="/start" />}
        />
        <Route 
          exact
          path='/start'
          element={<Start />}
        />
        <Route 
          exact
          path='/next'
          element={<SecondPage />}
        />
      </Routes>
    </HashRouter>
  );
}