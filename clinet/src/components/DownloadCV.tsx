import React from "react";
import {
    PDFDownloadLink,
    Document,
    Page,
    Text,
    View,
    StyleSheet,
} from "@react-pdf/renderer";

// PDF Styling
const styles = StyleSheet.create({
    page: {
        backgroundColor: "#f9f9f9",
        padding: 20,
        fontFamily: "Helvetica",
        fontSize: 12, // Increased font size
        lineHeight: 1.5,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
        borderBottom: "1px solid #ddd",
        paddingBottom: 8,
    },
    profileSection: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
    },
    headerText: {
        fontSize: 18, // Increased font size
        fontWeight: "bold",
        marginBottom: 4,
        color: "#002855", // Professional dark blue
    },
    linksSection: {
        textAlign: "right",
        color: "#555555", // Mid gray for links
        fontSize: 14, // Adjusted font size
    },
    section: {
        marginBottom: 12, // Adjusted margin for spacing
    },
    sectionHeading: {
        fontSize: 16, // Increased font size
        fontWeight: "bold",
        marginBottom: 8,
        color: "#1C1C1C", // Dark gray for section headings
    },
    text: {
        marginBottom: 5,
        fontSize: 14, // Increased font size
        color: "#333333", // Neutral dark gray for general text
    },
    inlineSection: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 12,
    },
    boldText: {
        fontWeight: "bold",
        marginRight: 5,
        fontSize: 14, // Adjusted font size
        color: "#4B89DC", // Lighter professional blue for emphasis
    },
});


// PDF Document Component
const MyCVDocument = ({ data }) => (
    <Document>
        {data.map((cvData, index) => (
            <Page key={index} style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.profileSection}>
                        <Text style={styles.headerText}>{cvData.Name}</Text>
                        <Text>Email: {cvData.Email}</Text>
                        <Text>Phone: {cvData.Phone}</Text>
                    </View>
                    <View style={styles.linksSection}>
                        {cvData.LinkedIn && <Text>LinkedIn: {cvData.LinkedIn}</Text>}
                        {cvData.GitHub && <Text>GitHub: {cvData.GitHub}</Text>}
                    </View>
                </View>
                {["Profile", "Skills", "Languages"].map((section) => {
                    const sectionData = cvData[section];
                    if (!sectionData || sectionData.length === 0) return null;

                    return (
                        <View key={section} style={styles.section}>
                            <Text style={styles.sectionHeading}>{section}</Text>
                            <View style={{ marginLeft: 10 }}>
                                <Text>
                                    {Array.isArray(sectionData)
                                        ? sectionData.join(", ")
                                        : sectionData}
                                </Text>
                            </View>
                        </View>
                    );
                })}
                {["Education", "Experience", "Certifications", "Projects"].map((section) => {
                    const sectionData = cvData[section];
                    if (!sectionData || sectionData.length === 0) return null;

                    return (
                        <View style={styles.section} key={section}>
                            <Text style={styles.sectionHeading}>{section}</Text>
                            <View style={{ marginLeft: 10 }}>
                                {Array.isArray(sectionData)
                                    ? sectionData.map((item, idx) => (
                                        <Text key={idx}>{item}</Text>
                                    ))
                                    : <Text>{sectionData}</Text>}
                            </View>
                        </View>
                    );
                })}
                {["Interests"].map((section) => {
                    const sectionData = cvData[section];
                    if (!sectionData || sectionData.length === 0) return null;

                    return (
                        <View
                            key={section}
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                marginBottom: 10,
                            }}
                        >
                            <Text style={{ fontWeight: "bold", marginRight: 5 }}>{section}:</Text>
                            <Text>
                                {Array.isArray(sectionData)
                                    ? sectionData.join(", ")
                                    : sectionData}
                            </Text>
                        </View>
                    );
                })}
            </Page>
        ))}
    </Document>
);

// Main Component
const CVDownloadComponent = ({ dataNew }) => {
    console.log("The data received is: ", dataNew);

    return (
        <div className="">
            <div className="text-center">
                <PDFDownloadLink
                    document={<MyCVDocument data={dataNew} />}
                    fileName="dynamic-cvs.pdf"
                >
                    {({ loading }) =>
                        loading ? (
                            <button className="px-1 py-2 bg-gray-300">Preparing PDF...</button>
                        ) : (
                                <button className="btn bg-primary hover:bg-primary/90 text-white cursor-pointer text-sm h-10 px-4 py-2 font-medium">
                                Download PDF
                            </button>
                        )
                    }
                </PDFDownloadLink>
            </div>
        </div>

    );
};

export default CVDownloadComponent;

