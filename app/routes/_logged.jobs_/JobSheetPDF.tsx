import {
  Document,
  Page,
  PDFDownloadLink,
  PDFDownloadLinkProps,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'
import React from 'react'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: '30%',
    fontWeight: 'bold',
  },
  value: {
    width: '70%',
  },
})

type JobSheetItem = {
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

type JobSheetData = JobSheetItem[]

const JobSheetPDF: React.FC<{ data: JobSheetData }> = ({ data }) => (
  <Document>
    {data.map((item, index) => (
      <Page key={index} size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>ACAB ROLLER BLIND ACMEDA WORKSHEET</Text>
          <Text style={styles.subtitle}>
            Item {index + 1} of {data.length}
          </Text>
          <View style={styles.row}>
            <Text style={styles.label}>NAME:</Text>
            <Text style={styles.value}>{item.customerName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>REP:</Text>
            <Text style={styles.value}>{item.salesRep}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>DATE:</Text>
            <Text style={styles.value}>{item.date}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>ROOM:</Text>
            <Text style={styles.value}>{item.roomNumber}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>TUBE:</Text>
            <Text style={styles.value}>{item.tube}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>WIDTH:</Text>
            <Text style={styles.value}>{item.width}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>DROP:</Text>
            <Text style={styles.value}>{item.drop}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>FIXING:</Text>
            <Text style={styles.value}>{item.fixing}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>BASE FINISH:</Text>
            <Text style={styles.value}>{item.baseFinish}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>ROLL TYPE:</Text>
            <Text style={styles.value}>{item.rollType}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>FABRIC:</Text>
            <Text style={styles.value}>{item.fabric}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>BRACKET:</Text>
            <Text style={styles.value}>{item.bracketType}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>CONTROL TYPE:</Text>
            <Text style={styles.value}>{item.controlType}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>CONTROL SIDE:</Text>
            <Text style={styles.value}>{item.controlSide}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>CONTROL COLOUR:</Text>
            <Text style={styles.value}>{item.controlColour}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>CHAIN LENGTH:</Text>
            <Text style={styles.value}>{item.chainLength}</Text>
          </View>
        </View>
      </Page>
    ))}
  </Document>
)

export const JobSheetPDFDownloadLink: React.FC<
  { data: JobSheetData } & PDFDownloadLinkProps
> = ({ data, ...props }) => (
  <PDFDownloadLink
    document={<JobSheetPDF data={data} />}
    fileName="job_sheet.pdf"
    style={{
      textDecoration: 'none',
      padding: '10px',
      borderRadius: '5px',
      backgroundColor: '#007bff',
      color: '#ffffff',
      cursor: 'pointer',
    }}
    {...props}
  >
    {({ blob, url, loading, error }) =>
      loading ? <span>Loading document...</span> : <span>Download PDF</span>
    }
  </PDFDownloadLink>
)

export default JobSheetPDF
