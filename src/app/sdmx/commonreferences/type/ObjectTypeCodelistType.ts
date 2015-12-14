/**
 *	<xs:simpleType name="ObjectTypeCodelistType">
*		<xs:annotation>
*			<xs:documentation>ObjectTypeCodelistType provides an enumeration of all objects outside of the base infomration model class. This includes some abstract object types such as Organsiation and Constraint.</xs:documentation>
*		</xs:annotation>
*		<xs:restriction base="xs:string">
*			<xs:enumeration value="Any"/>
*			<xs:enumeration value="Agency"/>
*			<xs:enumeration value="AgencyScheme"/>
*			<xs:enumeration value="AttachmentConstraint"/>
*			<xs:enumeration value="Attribute"/>
*			<xs:enumeration value="AttributeDescriptor"/>
*			<xs:enumeration value="Categorisation"/>
*			<xs:enumeration value="Category"/>
*			<xs:enumeration value="CategorySchemeMap"/>
*			<xs:enumeration value="CategoryScheme"/>
*			<xs:enumeration value="Code"/>
*			<xs:enumeration value="CodeMap"/>
*			<xs:enumeration value="Codelist"/>
*			<xs:enumeration value="CodelistMap"/>
*			<xs:enumeration value="ComponentMap"/>
*			<xs:enumeration value="Concept"/>
*			<xs:enumeration value="ConceptMap"/>
*			<xs:enumeration value="ConceptScheme"/>
*			<xs:enumeration value="ConceptSchemeMap"/>
*			<xs:enumeration value="Constraint"/>
*			<xs:enumeration value="ConstraintTarget"/>
*			<xs:enumeration value="ContentConstraint"/>
*			<xs:enumeration value="Dataflow"/>
*			<xs:enumeration value="DataConsumer"/>
*			<xs:enumeration value="DataConsumerScheme"/>
*			<xs:enumeration value="DataProvider"/>
*			<xs:enumeration value="DataProviderScheme"/>
*			<xs:enumeration value="DataSetTarget"/>
*			<xs:enumeration value="DataStructure"/>
*			<xs:enumeration value="Dimension"/>
*			<xs:enumeration value="DimensionDescriptor"/>
*			<xs:enumeration value="DimensionDescriptorValuesTarget"/>
*			<xs:enumeration value="GroupDimensionDescriptor"/>
*			<xs:enumeration value="HierarchicalCode"/>
*			<xs:enumeration value="HierarchicalCodelist"/>
*			<xs:enumeration value="Hierarchy"/>
*			<xs:enumeration value="HybridCodelistMap"/>
*			<xs:enumeration value="HybridCodeMap"/>
*			<xs:enumeration value="IdentifiableObjectTarget"/>
*			<xs:enumeration value="Level"/>
*			<xs:enumeration value="MeasureDescriptor"/>
*			<xs:enumeration value="MeasureDimension"/>
*			<xs:enumeration value="Metadataflow"/>
*			<xs:enumeration value="MetadataAttribute"/>
*			<xs:enumeration value="MetadataSet"/>
*			<xs:enumeration value="MetadataStructure"/>
*			<xs:enumeration value="MetadataTarget"/>
*			<xs:enumeration value="Organisation"/>
*			<xs:enumeration value="OrganisationMap"/>
*			<xs:enumeration value="OrganisationScheme"/>
*			<xs:enumeration value="OrganisationSchemeMap"/>
*			<xs:enumeration value="OrganisationUnit"/>
*			<xs:enumeration value="OrganisationUnitScheme"/>
*			<xs:enumeration value="PrimaryMeasure"/>
*			<xs:enumeration value="Process"/>
*			<xs:enumeration value="ProcessStep"/>
*			<xs:enumeration value="ProvisionAgreement"/>
*			<xs:enumeration value="ReportingCategory"/>
*			<xs:enumeration value="ReportingCategoryMap"/>
*			<xs:enumeration value="ReportingTaxonomy"/>
*			<xs:enumeration value="ReportingTaxonomyMap"/>
*			<xs:enumeration value="ReportingYearStartDay"/>
*			<xs:enumeration value="ReportPeriodTarget"/>
*			<xs:enumeration value="ReportStructure"/>
*			<xs:enumeration value="StructureMap"/>
*			<xs:enumeration value="StructureSet"/>
*			<xs:enumeration value="TimeDimension"/>
*			<xs:enumeration value="Transition"/>
*		</xs:restriction>
*	</xs:simpleType>
*
 * @author James
 */
/**
 *  This file is part of SdmxSax.
 *
 *   SdmxSax is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 
 *   SdmxSax is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with SdmxSax.  If not, see <http://www.gnu.org/licenses/>.
 *
 *  Copyright James Gardner 2014
 */
module sdmx.commonreferences.type {
    export class ObjectTypeCodelistType {

        public static ENUM: Array<ObjectTypeCodelistType> = new Array<ObjectTypeCodelistType>();
        public static STRING_ENUM: Array<String> = new Array<String>();

        public static TARGET_ANY: String = ObjectTypeCodelistType.addString("Any");
        public static TARGET_AGENCY: String = ObjectTypeCodelistType.addString("Agency");

        public static TARGET_AGENCYSCHEME: String = ObjectTypeCodelistType.addString("AgencyScheme");
        public static TARGET_ATTACHMENTCONSTRAINT: String = ObjectTypeCodelistType.addString("AttachmentConstraint");
        public static TARGET_ATTRIBUTE: String = ObjectTypeCodelistType.addString("Attribute");
        public static TARGET_ATTRIBUTEDESCRIPTOR: String = ObjectTypeCodelistType.addString("AttributeDescriptor");
        public static TARGET_CATEGORISATION: String = ObjectTypeCodelistType.addString("Categorisation");
        public static TARGET_CATEGORY: String = ObjectTypeCodelistType.addString("Category");
        public static TARGET_CATEGORYSCHEMEMAP: String = ObjectTypeCodelistType.addString("CategorySchemeMap");
        public static TARGET_CATEGORYSCHEME: String = ObjectTypeCodelistType.addString("CategoryScheme");
        public static TARGET_CODE: String = ObjectTypeCodelistType.addString("Code");
        public static TARGET_CODEMAP: String = ObjectTypeCodelistType.addString("CodeMap");
        public static TARGET_CODELIST: String = ObjectTypeCodelistType.addString("Codelist");
        public static TARGET_CODELISTMAP: String = ObjectTypeCodelistType.addString("CodelistMap");
        public static TARGET_COMPONENTMAP: String = ObjectTypeCodelistType.addString("ComponentMap");
        public static TARGET_CONCEPT: String = ObjectTypeCodelistType.addString("Concept");
        public static TARGET_CONCEPTMAP: String = ObjectTypeCodelistType.addString("ConceptMap");
        public static TARGET_CONCEPTSCHEME: String = ObjectTypeCodelistType.addString("ConceptScheme");
        public static TARGET_CONCEPTSCHEMEMAP: String = ObjectTypeCodelistType.addString("ConceptSchemeMap");
        public static TARGET_CONSTRAINT: String = ObjectTypeCodelistType.addString("Constraint");
        public static TARGET_CONSTRAINTARGET: String = ObjectTypeCodelistType.addString("ConstraintTarget");
        public static TARGET_CONTENTCONSTRAINT: String = ObjectTypeCodelistType.addString("ContentConstraint");
        public static TARGET_DATAFLOW: String = ObjectTypeCodelistType.addString("Dataflow");
        public static TARGET_DATACONSUMER: String = ObjectTypeCodelistType.addString("DataConsumer");
        public static TARGET_DATACONSUMERSCHEME: String = ObjectTypeCodelistType.addString("DataConsumerScheme");
        public static TARGET_DATAPROVIDER: String = ObjectTypeCodelistType.addString("DataProvider");
        public static TARGET_DATAPROVIDERSCHEME: String = ObjectTypeCodelistType.addString("DataProviderScheme");
        public static TARGET_DATASETTARGET: String = ObjectTypeCodelistType.addString("DataSetTarget");
        public static TARGET_DATASTRUCTURE: String = ObjectTypeCodelistType.addString("DataStructure");
        public static TARGET_DIMENSION: String = ObjectTypeCodelistType.addString("Dimension");
        public static TARGET_DIMENSIONDESCRIPTOR: String = ObjectTypeCodelistType.addString("DimensionDescriptor");
        public static TARGET_DIMENSIONDESCRIPTORVALUESTARGET: String = ObjectTypeCodelistType.addString("DimensionDescriptorValuesTarget");
        public static TARGET_GROUPDIMENSIONDESCRIPTOR: String = ObjectTypeCodelistType.addString("GroupDimensionDescriptor");
        public static TARGET_HIERARCHICALCODE: String = ObjectTypeCodelistType.addString("HierarchicalCode");
        public static TARGET_HIERARCHICALCODELIST: String = ObjectTypeCodelistType.addString("HierarchicalCodelist");
        public static TARGET_HIERARCHY: String = ObjectTypeCodelistType.addString("Hierarchy");
        public static TARGET_HYBRIDCODELISTMAP: String = ObjectTypeCodelistType.addString("HybridCodelistMap");
        public static TARGET_HYBRIDCODEMAP: String = ObjectTypeCodelistType.addString("HybridCodeMap");
        public static TARGET_IDENTIFIABLEOBJECTTARGET: String = ObjectTypeCodelistType.addString("IdentifiableObjectTarget");
        public static TARGET_LEVEL: String = ObjectTypeCodelistType.addString("Level");
        public static TARGET_MEASUREDESCRIPTOR: String = ObjectTypeCodelistType.addString("MeasureDescriptor");
        public static TARGET_MEASUREDIMENSION: String = ObjectTypeCodelistType.addString("MeasureDimension");
        public static TARGET_METADATAFLOW: String = ObjectTypeCodelistType.addString("Metadataflow");
        public static TARGET_METADATAATTRIBUTE: String = ObjectTypeCodelistType.addString("MetadataAttribute");
        public static TARGET_METADATASET: String = ObjectTypeCodelistType.addString("MetadataSet");
        public static TARGET_METADATASTRUCTURE: String = ObjectTypeCodelistType.addString("MetadataStructure");
        public static TARGET_METADATATARGET: String = ObjectTypeCodelistType.addString("MetadataTarget");
        public static TARGET_ORGANISATION: String = ObjectTypeCodelistType.addString("Organisation");
        public static TARGET_ORGANISATIONMAP: String = ObjectTypeCodelistType.addString("OrganisationMap");
        public static TARGET_ORGANISATIONSCHEME: String = ObjectTypeCodelistType.addString("OrganisationScheme");
        public static TARGET_ORGANISATIONSCHEMEMAP: String = ObjectTypeCodelistType.addString("OrganisationSchemeMap");
        public static TARGET_ORGANISATIONUNIT: String = ObjectTypeCodelistType.addString("OrganisationUnit");
        public static TARGET_ORGANISATIONUNITSCHEME: String = ObjectTypeCodelistType.addString("OrganisationUnitScheme");
        public static TARGET_PRIMARYMEASURE: String = ObjectTypeCodelistType.addString("PrimaryMeasure");
        public static TARGET_PROCESS: String = ObjectTypeCodelistType.addString("Process");
        public static TARGET_PROCESSSTEP: String = ObjectTypeCodelistType.addString("ProcessStep");
        public static TARGET_PROVISIONAGREEMENT: String = ObjectTypeCodelistType.addString("ProvisionAgreement");
        public static TARGET_REPORTINGCATEGORY: String = ObjectTypeCodelistType.addString("ReportingCategory");
        public static TARGET_REPORTINGCATEGORYMAP: String = ObjectTypeCodelistType.addString("ReportingCategoryMap");
        public static TARGET_REPORTINGTAXONOMY: String = ObjectTypeCodelistType.addString("ReportingTaxonomy");
        public static TARGET_REPORTINGTAXONOMYMAP: String = ObjectTypeCodelistType.addString("ReportingTaxonomyMap");
        public static TARGET_REPORTINGYEARSTARTDAY: String = ObjectTypeCodelistType.addString("ReportingYearStartDay");
        public static TARGET_REPORTPERIODTARGET: String = ObjectTypeCodelistType.addString("ReportPeriodTarget");
        public static TARGET_REPORTSTRUCTURE: String = ObjectTypeCodelistType.addString("ReportStructure");
        public static TARGET_STRUCTUREMAP: String = ObjectTypeCodelistType.addString("StructureMap");
        public static TARGET_STRUCTURESET: String = ObjectTypeCodelistType.addString("StructureSet");
        public static TARGET_TIMEDIMENSION: String = ObjectTypeCodelistType.addString("TimeDimension");
        public static TARGET_TRANSITION: String = ObjectTypeCodelistType.addString("Transition");

        public static ANY: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ANY);
        public static AGENCY: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_AGENCY);
        public static AGENCYSCHEME: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_AGENCYSCHEME);
        public static ATTACHMENTCONSTRAINT: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ATTACHMENTCONSTRAINT);
        public static ATTRIBUTE: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ATTRIBUTE);
        public static ATTRIBUTEDESCRIPTOR: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ATTRIBUTEDESCRIPTOR);
        public static CATEGORISATION: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CATEGORISATION);
        public static CATEGORY: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CATEGORY);
        public static CATEGORYSCHEMEMAP: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CATEGORYSCHEMEMAP);
        public static CATEGORYSCHEME: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CATEGORYSCHEME);
        public static CODE: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CODE);
        public static CODEMAP: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CODE);
        public static CODELIST: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CODELIST);
        public static CODELISTMAP: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CODELISTMAP);
        public static COMPONENTMAP: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_COMPONENTMAP);
        public static CONCEPT: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CONCEPT);
        public static CONCEPTMAP: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CONCEPTMAP);
        public static CONCEPTSCHEME: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CONCEPTSCHEME);
        public static CONCEPTSCHEMEMAP: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CONCEPTSCHEMEMAP);
        public static CONSTRAINT: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CONSTRAINT);
        public static CONSTRAINTARGET: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CONSTRAINTARGET);
        public static CONTENTCONSTRAINT: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CONTENTCONSTRAINT);
        public static DATAFLOW: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DATAFLOW);
        public static DATACONSUMER: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DATACONSUMER);
        public static DATACONSUMERSCHEME: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DATACONSUMERSCHEME);
        public static DATAPROVIDER: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DATAPROVIDER);
        public static DATAPROVIDERSCHEME: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DATAPROVIDERSCHEME);
        public static DATASETTARGET: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DATASETTARGET);
        public static DATASTRUCTURE: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DATASTRUCTURE);
        public static DIMENSION: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DIMENSION);
        public static DIMENSIONDESCRIPTOR: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DIMENSIONDESCRIPTOR);
        public static DIMENSIONDESCRIPTORVALUESTARGET: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DIMENSIONDESCRIPTORVALUESTARGET);
        public static GROUPDIMENSIONDESCRIPTOR: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_GROUPDIMENSIONDESCRIPTOR);
        public static HIERARCHICALCODE: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_HIERARCHICALCODE);
        public static HIERARCHICALCODELIST: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_HIERARCHICALCODELIST);
        public static HIERARCHY: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_HIERARCHY);
        public static HYBRIDCODELISTMAP: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_HYBRIDCODELISTMAP);
        public static HYBRIDCODEMAP: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_HYBRIDCODEMAP);
        public static IDENTIFIABLEOBJECTTARGET: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_IDENTIFIABLEOBJECTTARGET);
        public static LEVEL: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_LEVEL);
        public static MEASUREDESCRIPTOR: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_MEASUREDESCRIPTOR);
        public static MEASUREDIMENSION: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_MEASUREDIMENSION);
        public static METADATAFLOW: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_METADATAFLOW);
        public static METADATAATTRIBUTE: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_METADATAATTRIBUTE);
        public static METADATASET: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_METADATASET);
        public static METADATASTRUCTURE: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_METADATASTRUCTURE);
        public static METADATATARGET: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_METADATATARGET);
        public static ORGANISATION: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ORGANISATION);
        public static ORGANISATIONMAP: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ORGANISATIONMAP);
        public static ORGANISATIONSCHEME: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ORGANISATIONSCHEME);
        public static ORGANISATIONSCHEMEMAP: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ORGANISATIONSCHEMEMAP);
        public static ORGANISATIONUNIT: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ORGANISATIONUNIT);
        public static ORGANISATIONUNITSCHEME: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ORGANISATIONUNITSCHEME);
        public static PRIMARYMEASURE: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_PRIMARYMEASURE);
        public static PROCESS: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_PROCESS);
        public static PROCESSSTEP: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_PROCESSSTEP);
        public static PROVISIONAGREEMENT: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_PROVISIONAGREEMENT);
        public static REPORTINGCATEGORY: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_REPORTINGCATEGORY);
        public static REPORTINGCATEGORYMAP: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_REPORTINGCATEGORYMAP);
        public static REPORTINGTAXONOMY: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_REPORTINGTAXONOMY);
        public static REPORTINGTAXONOMYMAP: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_REPORTINGTAXONOMYMAP);
        public static REPORTINGYEARSTARTDAY: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_REPORTINGYEARSTARTDAY);
        public static REPORTPERIODTARGET: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_REPORTPERIODTARGET);
        public static REPORTSTRUCTURE: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_REPORTSTRUCTURE);
        public static STRUCTUREMAP: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_STRUCTUREMAP);
        public static STRUCTURESET: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_STRUCTURESET);
        public static TIMEDIMENSION: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_TIMEDIMENSION);
        public static TRANSITION: ObjectTypeCodelistType = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_TRANSITION);

        public static INT_ANY: number = 0;
        public static INT_AGENCY: number = 1;
        public static INT_AGENCYSCHEME: number = 2;
        public static INT_ATTACHMENTCONSTRAINT: number = 3;
        public static INT_ATTRIBUTE: number = 4;
        public static INT_ATTRIBUTEDESCRIPTOR: number = 5;
        public static INT_CATEGORISATION: number = 6;
        public static INT_CATEGORY: number = 7;
        public static INT_CATEGORYSCHEMEMAP: number = 8;
        public static INT_CATEGORYSCHEME: number = 9;
        public static INT_CODE: number = 10;
        public static INT_CODEMAP: number = 11;
        public static INT_CODELIST: number = 12;
        public static INT_CODELISTMAP: number = 13;
        public static INT_COMPONENTMAP: number = 14;
        public static INT_CONCEPT: number = 15;
        public static INT_CONCEPTMAP: number = 16;
        public static INT_CONCEPTSCHEME: number = 17;
        public static INT_CONCEPTSCHEMEMAP: number = 18;
        public static INT_CONSTRAINT: number = 19;
        public static INT_CONSTRAINTARGET: number = 20;
        public static INT_CONTENTCONSTRAINT: number = 21;
        public static INT_DATAFLOW: number = 22;
        public static INT_DATACONSUMER: number = 23;
        public static INT_DATACONSUMERSCHEME: number = 24;
        public static INT_DATAPROVIDER: number = 25;
        public static INT_DATAPROVIDERSCHEME: number = 26;
        public static INT_DATASETTARGET: number = 27;
        public static INT_DATASTRUCTURE: number = 28;
        public static INT_DIMENSION: number = 29;
        public static INT_DIMENSIONDESCRIPTOR: number = 30;
        public static INT_DIMENSIONDESCRIPTORVALUESTARGET: number = 31;
        public static INT_GROUPDIMENSIONDESCRIPTOR: number = 32;
        public static INT_HIERARCHICALCODE: number = 33;
        public static INT_HIERARCHICALCODELIST: number = 34;
        public static INT_HIERARCHY: number = 35;
        public static INT_HYBRIDCODELISTMAP: number = 36;
        public static INT_HYBRIDCODEMAP: number = 37;
        public static INT_IDENTIFIABLEOBJECTTARGET: number = 38;
        public static INT_LEVEL: number = 39;
        public static INT_MEASUREDESCRIPTOR: number = 40;
        public static INT_MEASUREDIMENSION: number = 41;
        public static INT_METADATAFLOW: number = 42;
        public static INT_METADATAATTRIBUTE: number = 43;
        public static INT_METADATASET: number = 44;
        public static INT_METADATASTRUCTURE: number = 45;
        public static INT_METADATATARGET: number = 46;
        public static INT_ORGANISATION: number = 47;
        public static INT_ORGANISATIONMAP: number = 48;
        public static INT_ORGANISATIONSCHEME: number = 49;
        public static INT_ORGANISATIONSCHEMEMAP: number = 50;
        public static INT_ORGANISATIONUNIT: number = 51;
        public static INT_ORGANISATIONUNITSCHEME: number = 52;
        public static INT_PRIMARYMEASURE: number = 53;
        public static INT_PROCESS: number = 54;
        public static INT_PROCESSSTEP: number = 55;
        public static INT_PROVISIONAGREEMENT: number = 56;
        public static INT_REPORTINGCATEGORY: number = 57;
        public static INT_REPORTINGCATEGORYMAP: number = 58;
        public static INT_REPORTINGTAXONOMY: number = 59;
        public static INT_REPORTINGTAXONOMYMAP: number = 60;
        public static INT_REPORTINGYEARSTARTDAY: number = 61;
        public static INT_REPORTPERIODTARGET: number = 62;
        public static INT_REPORTSTRUCTURE: number = 63;
        public static INT_STRUCTUREMAP: number = 64;
        public static INT_STRUCTURESET: number = 65;
        public static INT_TIMEDIMENSION: number = 66;
        public static INT_TRANSITION: number = 67;

        // Utility
        private static add(s: String): ObjectTypeCodelistType {
            var b: ObjectTypeCodelistType = new ObjectTypeCodelistType(s);
            ObjectTypeCodelistType.ENUM.push(b);
            return b;
        }
        private static addString(s: String): String {
            ObjectTypeCodelistType.STRING_ENUM.push(s);
            return s;
        }

        public static fromString(s: String): ObjectTypeCodelistType {
            for (var i: number = 0; i < ObjectTypeCodelistType.ENUM.length; i++) {
                if (ObjectTypeCodelistType.ENUM[i].target == s) return ObjectTypeCodelistType.ENUM[i];
            }
            return null;
        }
        public static fromStringWithException(s: String): ObjectTypeCodelistType {
            for (var i: number = 0; i < ObjectTypeCodelistType.ENUM.length; i++) {
                if (ObjectTypeCodelistType.ENUM[i].target == s) return ObjectTypeCodelistType.ENUM[i];
            }
            throw new Error("Value:" + s + " not found in enumeration! - ObjectypeCodelistType");
        }
        // Instance
        private target: String = null;
        private index: number = -1;
        public constructor(s: String) {
            var contains: boolean = false;
            for (var i = 0; i < ObjectTypeCodelistType.STRING_ENUM.length; i++) {
                if (ObjectTypeCodelistType.STRING_ENUM[i] == s) {
                    contains = true;
                }
            }
            if (!contains) throw new Error(s + " is not a valid CodeTypeCodelistType");
            this.target = s;
            this.index = ObjectTypeCodelistType.STRING_ENUM.indexOf(s);
        }
        public toString(): String { return this.target; }
        public toInt(): number {
            return this.index;
        }
    }
}