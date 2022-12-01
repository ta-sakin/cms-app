import React from "react";
import { Page, Text, Document, StyleSheet, Font } from "@react-pdf/renderer";
import moment from "moment";

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
const PDFTemplate = ({ complain, assign }) => {
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

export default PDFTemplate;
