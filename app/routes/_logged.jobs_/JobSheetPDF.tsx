import {
  Document,
  Page,
  PDFDownloadLink,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'
import React from 'react'

type JobSheetData = {
  customerName: string
  salesRep: string
  date: string
  roomNumber: string
  tube: string
  width: string
  drop: string
  fixing: string
  baseFinish: string
  rollType: string
  fabric: string
  bracketType: string
  controlType: string
  controlSide: string
  controlColour: string
  chainLength: string
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    borderBottomStyle: 'solid',
    alignItems: 'center',
    height: 24,
    fontStyle: 'bold',
  },
  label: {
    width: '30%',
    textAlign: 'right',
    marginRight: 8,
  },
  value: {
    width: '70%',
  },
})

const JobSheetPDF: React.FC<{ data: JobSheetData }> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>ACAB ROLLER BLIND ACMEDA WORKSHEET</Text>
        <View style={styles.row}>
          <Text style={styles.label}>NAME:</Text>
          <Text style={styles.value}>{data.customerName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>REP:</Text>
          <Text style={styles.value}>{data.salesRep}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>DATE:</Text>
          <Text style={styles.value}>{data.date}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>ROOM:</Text>
          <Text style={styles.value}>{data.roomNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>TUBE:</Text>
          <Text style={styles.value}>{data.tube}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>WIDTH:</Text>
          <Text style={styles.value}>{data.width}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>DROP:</Text>
          <Text style={styles.value}>{data.drop}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>FIXING:</Text>
          <Text style={styles.value}>{data.fixing}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>BASE FINISH:</Text>
          <Text style={styles.value}>{data.baseFinish}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>ROLL TYPE:</Text>
          <Text style={styles.value}>{data.rollType}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>FABRIC:</Text>
          <Text style={styles.value}>{data.fabric}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>BRACKET:</Text>
          <Text style={styles.value}>{data.bracketType}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>CONTROL TYPE:</Text>
          <Text style={styles.value}>{data.controlType}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>CONTROL SIDE:</Text>
          <Text style={styles.value}>{data.controlSide}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>CONTROL COLOUR:</Text>
          <Text style={styles.value}>{data.controlColour}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>CHAIN LENGTH:</Text>
          <Text style={styles.value}>{data.chainLength}</Text>
        </View>
      </View>
    </Page>
  </Document>
)

export const JobSheetPDFDownloadLink: React.FC<{ data: JobSheetData }> = ({
  data,
}) => (
  <PDFDownloadLink
    document={<JobSheetPDF data={data} />}
    fileName="job_sheet.pdf"
  >
    {({ loading }: { loading: boolean }) => (
      <>
        {loading ? <span>Loading document...</span> : <span>Download PDF</span>}
      </>
    )}
  </PDFDownloadLink>
)

export default JobSheetPDF
