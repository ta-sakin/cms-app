// Drawer
// https://codesandbox.io/s/react-side-drawer-np0jwf?fontsize=14&hidenavigation=1&theme=dark&file=/src/components/Backdrop.css

import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import ButtonSpin from "../../shared/ButtonSpin";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Font,
} from "@react-pdf/renderer";
import moment from "moment";
import { toast } from "react-toastify";

const defaultValue = {
  name: "",
  email: "",
  contact: "",
  designation: "",
  remarks: "",
};

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
  },
  author: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Oswald",
  },
  text: {
    marginLeft: 12,
    marginBottom: 8,
    fontSize: 16,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  textTitle: {
    marginLeft: 12,
    marginBottom: 12,
    marginTop: 12,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
});

const PendingApproval = ({ complain }) => {
  const [expand, setExpand] = useState(true);
  const [loading, setLoading] = useState(false);
  const [assign, setAssign] = useState(defaultValue);
  const { name, email, contact, designation, remarks } = assign;
  const [assigned, setAssigned] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [refetch, setRefetch] = useState(false);
  // const []
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/admin/assign/${complain._id}`);
        if (Object.keys(data).length < 1) {
          setAssign(defaultValue);
          setUpdated(true);
          setLoading(false);
        } else {
          setLoading(false);
          setAssign(data);
          setAssigned(true);
          setUpdated(false);
        }
      } catch (error) {}
    })();
  }, [complain, refetch]);

  const handleChange = (e) => {
    setUpdated(true);
    setAssign({ ...assign, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!assigned) {
        setLoading(true);
        const { data } = await axios.post("/admin/assign", {
          complain_id: complain._id,
          status_type: "verification",
          ...assign,
        });
        if (data.acknowledged) {
          setLoading(false);
          setAssign(defaultValue);
          toast.success("Complain assigned successfully", {
            toastId: "success",
          });
          setRefetch(!refetch);
        }
      } else if (assigned && updated) {
        setLoading(true);
        const { data } = await axios.put("/admin/assign", {
          ...assign,
        });
        if (data.acknowledged) {
          setLoading(false);
          toast.success("Complain assigned successfully", {
            toastId: "success",
          });
          setRefetch(!refetch);
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const PDFTemplate = () => {
    return (
      <Document>
        <Page style={styles.body}>
          <Text style={styles.title}>CCC ADMIN - COMPLAIN ASSIGNMENT</Text>
          <Text style={styles.author}>
            Ward: {complain.ward}, Date:
            {moment(new Date()).format("DD-MM-YYYY")}{" "}
          </Text>
          <Text style={styles.text}>Complain No: {complain._id}</Text>
          <Text style={styles.text}>Admin Remarks: {assign.remarks}</Text>
          <Text style={styles.textTitle}>
            The complain should be verified by:
          </Text>
          <Text style={styles.text}>Full Name: {assign.name}</Text>
          <Text style={styles.text}>Email: {assign.email}</Text>
          <Text style={styles.text}>Phone: {assign.contact}</Text>
          <Text style={styles.text}>Designation: {assign.designation}</Text>
        </Page>
      </Document>
    );
  };

  return (
    <div className="w-full max-w-sm">
      <div
        className="cursor-pointer bg-gray-500 rounded-lg px-4 hover:bg-gray-600 flex justify-between items-center h-fit"
        onClick={() => setExpand(!expand)}
      >
        <p className="text-white font-semibold py-2">Assign For Verificaion</p>
        <IoIosArrowForward
          className={`duration-200 text-white ${
            expand && "transition-transform mb-2 origin-left rotate-90"
          }`}
        />
      </div>
      {expand && (
        <div className="bg-gray-100 pb-8">
          {assigned ? (
            <p className="text-center font-bold py-4 text-purple-700">
              Assigned For Verification To:
            </p>
          ) : (
            <p className="text-center font-semibold py-4">Assign To:</p>
          )}
          <div className="mx-6">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-5">
                <label htmlFor="name">
                  <p className="text-sm text-slate-700 pb-1">Full Name</p>
                  <input
                    onChange={handleChange}
                    id="name"
                    name="name"
                    type="name"
                    value={name}
                    autoComplete="name"
                    className="w-full text-sm py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="Enter email address"
                  />
                </label>
                <label htmlFor="email">
                  <p className="text-sm text-slate-700 pb-1">Email</p>
                  <input
                    onChange={handleChange}
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    autoComplete="email"
                    className="w-full text-sm py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="Email address"
                  />
                </label>
                <label htmlFor="contact">
                  <p className="text-sm text-slate-700 pb-1">Contact</p>
                  <input
                    onChange={handleChange}
                    id="contact"
                    name="contact"
                    type="contact"
                    value={contact}
                    className="w-full text-sm py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="Phone number"
                  />
                </label>
                <label htmlFor="designation">
                  <p className="text-sm text-slate-700 pb-1">Designation</p>
                  <input
                    onChange={handleChange}
                    id="designation"
                    name="designation"
                    type="designation"
                    value={designation}
                    autoComplete="designation"
                    className="w-full text-sm py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="Enter email address"
                  />
                </label>
                <label htmlFor="remarks">
                  <p className="text-sm text-slate-700 pb-1">Admin Remarks</p>
                  <textarea
                    onChange={handleChange}
                    id="remarks"
                    name="remarks"
                    type="remarks"
                    value={remarks}
                    autoComplete="remarks"
                    rows={3}
                    className="w-full text-sm py-2 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                    placeholder="Admin remarks"
                  />
                </label>
              </div>
            </form>
            {updated ? (
              <>
                <button
                  className={
                    "w-full py-2 my-2 font-medium text-white bg-black rounded-lg border-black hover:shadow inline-flex space-x-2 items-center justify-center "
                  }
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {!loading ? <span>Save & Generate PDF</span> : <ButtonSpin />}
                </button>
              </>
            ) : (
              <PDFDownloadLink
                document={<PDFTemplate />}
                fileName="Assigned-for-verification"
              >
                {({ loading }) =>
                  loading ? (
                    <button
                      className="w-full py-2 my-2 font-medium text-white bg-black rounded-lg border-black hover:shadow inline-flex space-x-2 items-center justify-center"
                      disabled
                    >
                      <ButtonSpin />
                    </button>
                  ) : (
                    <button className="w-full py-2 my-2 font-medium text-white bg-black rounded-lg border-black hover:shadow inline-flex space-x-2 items-center justify-center">
                      Download PDF{" "}
                    </button>
                  )
                }
              </PDFDownloadLink>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingApproval;
