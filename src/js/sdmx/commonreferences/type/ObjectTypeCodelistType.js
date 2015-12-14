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
var sdmx;
(function (sdmx) {
    var commonreferences;
    (function (commonreferences) {
        var type;
        (function (type) {
            var ObjectTypeCodelistType = (function () {
                function ObjectTypeCodelistType(s) {
                    // Instance
                    this.target = null;
                    this.index = -1;
                    var contains = false;
                    for (var i = 0; i < ObjectTypeCodelistType.STRING_ENUM.length; i++) {
                        if (ObjectTypeCodelistType.STRING_ENUM[i] == s) {
                            contains = true;
                        }
                    }
                    if (!contains)
                        throw new Error(s + " is not a valid CodeTypeCodelistType");
                    this.target = s;
                    this.index = ObjectTypeCodelistType.STRING_ENUM.indexOf(s);
                }
                // Utility
                ObjectTypeCodelistType.add = function (s) {
                    var b = new ObjectTypeCodelistType(s);
                    ObjectTypeCodelistType.ENUM.push(b);
                    return b;
                };
                ObjectTypeCodelistType.addString = function (s) {
                    ObjectTypeCodelistType.STRING_ENUM.push(s);
                    return s;
                };
                ObjectTypeCodelistType.fromString = function (s) {
                    for (var i = 0; i < ObjectTypeCodelistType.ENUM.length; i++) {
                        if (ObjectTypeCodelistType.ENUM[i].target == s)
                            return ObjectTypeCodelistType.ENUM[i];
                    }
                    return null;
                };
                ObjectTypeCodelistType.fromStringWithException = function (s) {
                    for (var i = 0; i < ObjectTypeCodelistType.ENUM.length; i++) {
                        if (ObjectTypeCodelistType.ENUM[i].target == s)
                            return ObjectTypeCodelistType.ENUM[i];
                    }
                    throw new Error("Value:" + s + " not found in enumeration! - ObjectypeCodelistType");
                };
                ObjectTypeCodelistType.prototype.toString = function () { return this.target; };
                ObjectTypeCodelistType.prototype.toInt = function () {
                    return this.index;
                };
                ObjectTypeCodelistType.ENUM = new Array();
                ObjectTypeCodelistType.STRING_ENUM = new Array();
                ObjectTypeCodelistType.TARGET_ANY = ObjectTypeCodelistType.addString("Any");
                ObjectTypeCodelistType.TARGET_AGENCY = ObjectTypeCodelistType.addString("Agency");
                ObjectTypeCodelistType.TARGET_AGENCYSCHEME = ObjectTypeCodelistType.addString("AgencyScheme");
                ObjectTypeCodelistType.TARGET_ATTACHMENTCONSTRAINT = ObjectTypeCodelistType.addString("AttachmentConstraint");
                ObjectTypeCodelistType.TARGET_ATTRIBUTE = ObjectTypeCodelistType.addString("Attribute");
                ObjectTypeCodelistType.TARGET_ATTRIBUTEDESCRIPTOR = ObjectTypeCodelistType.addString("AttributeDescriptor");
                ObjectTypeCodelistType.TARGET_CATEGORISATION = ObjectTypeCodelistType.addString("Categorisation");
                ObjectTypeCodelistType.TARGET_CATEGORY = ObjectTypeCodelistType.addString("Category");
                ObjectTypeCodelistType.TARGET_CATEGORYSCHEMEMAP = ObjectTypeCodelistType.addString("CategorySchemeMap");
                ObjectTypeCodelistType.TARGET_CATEGORYSCHEME = ObjectTypeCodelistType.addString("CategoryScheme");
                ObjectTypeCodelistType.TARGET_CODE = ObjectTypeCodelistType.addString("Code");
                ObjectTypeCodelistType.TARGET_CODEMAP = ObjectTypeCodelistType.addString("CodeMap");
                ObjectTypeCodelistType.TARGET_CODELIST = ObjectTypeCodelistType.addString("Codelist");
                ObjectTypeCodelistType.TARGET_CODELISTMAP = ObjectTypeCodelistType.addString("CodelistMap");
                ObjectTypeCodelistType.TARGET_COMPONENTMAP = ObjectTypeCodelistType.addString("ComponentMap");
                ObjectTypeCodelistType.TARGET_CONCEPT = ObjectTypeCodelistType.addString("Concept");
                ObjectTypeCodelistType.TARGET_CONCEPTMAP = ObjectTypeCodelistType.addString("ConceptMap");
                ObjectTypeCodelistType.TARGET_CONCEPTSCHEME = ObjectTypeCodelistType.addString("ConceptScheme");
                ObjectTypeCodelistType.TARGET_CONCEPTSCHEMEMAP = ObjectTypeCodelistType.addString("ConceptSchemeMap");
                ObjectTypeCodelistType.TARGET_CONSTRAINT = ObjectTypeCodelistType.addString("Constraint");
                ObjectTypeCodelistType.TARGET_CONSTRAINTARGET = ObjectTypeCodelistType.addString("ConstraintTarget");
                ObjectTypeCodelistType.TARGET_CONTENTCONSTRAINT = ObjectTypeCodelistType.addString("ContentConstraint");
                ObjectTypeCodelistType.TARGET_DATAFLOW = ObjectTypeCodelistType.addString("Dataflow");
                ObjectTypeCodelistType.TARGET_DATACONSUMER = ObjectTypeCodelistType.addString("DataConsumer");
                ObjectTypeCodelistType.TARGET_DATACONSUMERSCHEME = ObjectTypeCodelistType.addString("DataConsumerScheme");
                ObjectTypeCodelistType.TARGET_DATAPROVIDER = ObjectTypeCodelistType.addString("DataProvider");
                ObjectTypeCodelistType.TARGET_DATAPROVIDERSCHEME = ObjectTypeCodelistType.addString("DataProviderScheme");
                ObjectTypeCodelistType.TARGET_DATASETTARGET = ObjectTypeCodelistType.addString("DataSetTarget");
                ObjectTypeCodelistType.TARGET_DATASTRUCTURE = ObjectTypeCodelistType.addString("DataStructure");
                ObjectTypeCodelistType.TARGET_DIMENSION = ObjectTypeCodelistType.addString("Dimension");
                ObjectTypeCodelistType.TARGET_DIMENSIONDESCRIPTOR = ObjectTypeCodelistType.addString("DimensionDescriptor");
                ObjectTypeCodelistType.TARGET_DIMENSIONDESCRIPTORVALUESTARGET = ObjectTypeCodelistType.addString("DimensionDescriptorValuesTarget");
                ObjectTypeCodelistType.TARGET_GROUPDIMENSIONDESCRIPTOR = ObjectTypeCodelistType.addString("GroupDimensionDescriptor");
                ObjectTypeCodelistType.TARGET_HIERARCHICALCODE = ObjectTypeCodelistType.addString("HierarchicalCode");
                ObjectTypeCodelistType.TARGET_HIERARCHICALCODELIST = ObjectTypeCodelistType.addString("HierarchicalCodelist");
                ObjectTypeCodelistType.TARGET_HIERARCHY = ObjectTypeCodelistType.addString("Hierarchy");
                ObjectTypeCodelistType.TARGET_HYBRIDCODELISTMAP = ObjectTypeCodelistType.addString("HybridCodelistMap");
                ObjectTypeCodelistType.TARGET_HYBRIDCODEMAP = ObjectTypeCodelistType.addString("HybridCodeMap");
                ObjectTypeCodelistType.TARGET_IDENTIFIABLEOBJECTTARGET = ObjectTypeCodelistType.addString("IdentifiableObjectTarget");
                ObjectTypeCodelistType.TARGET_LEVEL = ObjectTypeCodelistType.addString("Level");
                ObjectTypeCodelistType.TARGET_MEASUREDESCRIPTOR = ObjectTypeCodelistType.addString("MeasureDescriptor");
                ObjectTypeCodelistType.TARGET_MEASUREDIMENSION = ObjectTypeCodelistType.addString("MeasureDimension");
                ObjectTypeCodelistType.TARGET_METADATAFLOW = ObjectTypeCodelistType.addString("Metadataflow");
                ObjectTypeCodelistType.TARGET_METADATAATTRIBUTE = ObjectTypeCodelistType.addString("MetadataAttribute");
                ObjectTypeCodelistType.TARGET_METADATASET = ObjectTypeCodelistType.addString("MetadataSet");
                ObjectTypeCodelistType.TARGET_METADATASTRUCTURE = ObjectTypeCodelistType.addString("MetadataStructure");
                ObjectTypeCodelistType.TARGET_METADATATARGET = ObjectTypeCodelistType.addString("MetadataTarget");
                ObjectTypeCodelistType.TARGET_ORGANISATION = ObjectTypeCodelistType.addString("Organisation");
                ObjectTypeCodelistType.TARGET_ORGANISATIONMAP = ObjectTypeCodelistType.addString("OrganisationMap");
                ObjectTypeCodelistType.TARGET_ORGANISATIONSCHEME = ObjectTypeCodelistType.addString("OrganisationScheme");
                ObjectTypeCodelistType.TARGET_ORGANISATIONSCHEMEMAP = ObjectTypeCodelistType.addString("OrganisationSchemeMap");
                ObjectTypeCodelistType.TARGET_ORGANISATIONUNIT = ObjectTypeCodelistType.addString("OrganisationUnit");
                ObjectTypeCodelistType.TARGET_ORGANISATIONUNITSCHEME = ObjectTypeCodelistType.addString("OrganisationUnitScheme");
                ObjectTypeCodelistType.TARGET_PRIMARYMEASURE = ObjectTypeCodelistType.addString("PrimaryMeasure");
                ObjectTypeCodelistType.TARGET_PROCESS = ObjectTypeCodelistType.addString("Process");
                ObjectTypeCodelistType.TARGET_PROCESSSTEP = ObjectTypeCodelistType.addString("ProcessStep");
                ObjectTypeCodelistType.TARGET_PROVISIONAGREEMENT = ObjectTypeCodelistType.addString("ProvisionAgreement");
                ObjectTypeCodelistType.TARGET_REPORTINGCATEGORY = ObjectTypeCodelistType.addString("ReportingCategory");
                ObjectTypeCodelistType.TARGET_REPORTINGCATEGORYMAP = ObjectTypeCodelistType.addString("ReportingCategoryMap");
                ObjectTypeCodelistType.TARGET_REPORTINGTAXONOMY = ObjectTypeCodelistType.addString("ReportingTaxonomy");
                ObjectTypeCodelistType.TARGET_REPORTINGTAXONOMYMAP = ObjectTypeCodelistType.addString("ReportingTaxonomyMap");
                ObjectTypeCodelistType.TARGET_REPORTINGYEARSTARTDAY = ObjectTypeCodelistType.addString("ReportingYearStartDay");
                ObjectTypeCodelistType.TARGET_REPORTPERIODTARGET = ObjectTypeCodelistType.addString("ReportPeriodTarget");
                ObjectTypeCodelistType.TARGET_REPORTSTRUCTURE = ObjectTypeCodelistType.addString("ReportStructure");
                ObjectTypeCodelistType.TARGET_STRUCTUREMAP = ObjectTypeCodelistType.addString("StructureMap");
                ObjectTypeCodelistType.TARGET_STRUCTURESET = ObjectTypeCodelistType.addString("StructureSet");
                ObjectTypeCodelistType.TARGET_TIMEDIMENSION = ObjectTypeCodelistType.addString("TimeDimension");
                ObjectTypeCodelistType.TARGET_TRANSITION = ObjectTypeCodelistType.addString("Transition");
                ObjectTypeCodelistType.ANY = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ANY);
                ObjectTypeCodelistType.AGENCY = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_AGENCY);
                ObjectTypeCodelistType.AGENCYSCHEME = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_AGENCYSCHEME);
                ObjectTypeCodelistType.ATTACHMENTCONSTRAINT = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ATTACHMENTCONSTRAINT);
                ObjectTypeCodelistType.ATTRIBUTE = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ATTRIBUTE);
                ObjectTypeCodelistType.ATTRIBUTEDESCRIPTOR = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ATTRIBUTEDESCRIPTOR);
                ObjectTypeCodelistType.CATEGORISATION = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CATEGORISATION);
                ObjectTypeCodelistType.CATEGORY = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CATEGORY);
                ObjectTypeCodelistType.CATEGORYSCHEMEMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CATEGORYSCHEMEMAP);
                ObjectTypeCodelistType.CATEGORYSCHEME = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CATEGORYSCHEME);
                ObjectTypeCodelistType.CODE = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CODE);
                ObjectTypeCodelistType.CODEMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CODE);
                ObjectTypeCodelistType.CODELIST = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CODELIST);
                ObjectTypeCodelistType.CODELISTMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CODELISTMAP);
                ObjectTypeCodelistType.COMPONENTMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_COMPONENTMAP);
                ObjectTypeCodelistType.CONCEPT = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CONCEPT);
                ObjectTypeCodelistType.CONCEPTMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CONCEPTMAP);
                ObjectTypeCodelistType.CONCEPTSCHEME = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CONCEPTSCHEME);
                ObjectTypeCodelistType.CONCEPTSCHEMEMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CONCEPTSCHEMEMAP);
                ObjectTypeCodelistType.CONSTRAINT = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CONSTRAINT);
                ObjectTypeCodelistType.CONSTRAINTARGET = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CONSTRAINTARGET);
                ObjectTypeCodelistType.CONTENTCONSTRAINT = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_CONTENTCONSTRAINT);
                ObjectTypeCodelistType.DATAFLOW = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DATAFLOW);
                ObjectTypeCodelistType.DATACONSUMER = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DATACONSUMER);
                ObjectTypeCodelistType.DATACONSUMERSCHEME = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DATACONSUMERSCHEME);
                ObjectTypeCodelistType.DATAPROVIDER = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DATAPROVIDER);
                ObjectTypeCodelistType.DATAPROVIDERSCHEME = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DATAPROVIDERSCHEME);
                ObjectTypeCodelistType.DATASETTARGET = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DATASETTARGET);
                ObjectTypeCodelistType.DATASTRUCTURE = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DATASTRUCTURE);
                ObjectTypeCodelistType.DIMENSION = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DIMENSION);
                ObjectTypeCodelistType.DIMENSIONDESCRIPTOR = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DIMENSIONDESCRIPTOR);
                ObjectTypeCodelistType.DIMENSIONDESCRIPTORVALUESTARGET = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_DIMENSIONDESCRIPTORVALUESTARGET);
                ObjectTypeCodelistType.GROUPDIMENSIONDESCRIPTOR = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_GROUPDIMENSIONDESCRIPTOR);
                ObjectTypeCodelistType.HIERARCHICALCODE = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_HIERARCHICALCODE);
                ObjectTypeCodelistType.HIERARCHICALCODELIST = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_HIERARCHICALCODELIST);
                ObjectTypeCodelistType.HIERARCHY = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_HIERARCHY);
                ObjectTypeCodelistType.HYBRIDCODELISTMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_HYBRIDCODELISTMAP);
                ObjectTypeCodelistType.HYBRIDCODEMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_HYBRIDCODEMAP);
                ObjectTypeCodelistType.IDENTIFIABLEOBJECTTARGET = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_IDENTIFIABLEOBJECTTARGET);
                ObjectTypeCodelistType.LEVEL = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_LEVEL);
                ObjectTypeCodelistType.MEASUREDESCRIPTOR = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_MEASUREDESCRIPTOR);
                ObjectTypeCodelistType.MEASUREDIMENSION = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_MEASUREDIMENSION);
                ObjectTypeCodelistType.METADATAFLOW = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_METADATAFLOW);
                ObjectTypeCodelistType.METADATAATTRIBUTE = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_METADATAATTRIBUTE);
                ObjectTypeCodelistType.METADATASET = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_METADATASET);
                ObjectTypeCodelistType.METADATASTRUCTURE = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_METADATASTRUCTURE);
                ObjectTypeCodelistType.METADATATARGET = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_METADATATARGET);
                ObjectTypeCodelistType.ORGANISATION = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ORGANISATION);
                ObjectTypeCodelistType.ORGANISATIONMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ORGANISATIONMAP);
                ObjectTypeCodelistType.ORGANISATIONSCHEME = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ORGANISATIONSCHEME);
                ObjectTypeCodelistType.ORGANISATIONSCHEMEMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ORGANISATIONSCHEMEMAP);
                ObjectTypeCodelistType.ORGANISATIONUNIT = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ORGANISATIONUNIT);
                ObjectTypeCodelistType.ORGANISATIONUNITSCHEME = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_ORGANISATIONUNITSCHEME);
                ObjectTypeCodelistType.PRIMARYMEASURE = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_PRIMARYMEASURE);
                ObjectTypeCodelistType.PROCESS = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_PROCESS);
                ObjectTypeCodelistType.PROCESSSTEP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_PROCESSSTEP);
                ObjectTypeCodelistType.PROVISIONAGREEMENT = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_PROVISIONAGREEMENT);
                ObjectTypeCodelistType.REPORTINGCATEGORY = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_REPORTINGCATEGORY);
                ObjectTypeCodelistType.REPORTINGCATEGORYMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_REPORTINGCATEGORYMAP);
                ObjectTypeCodelistType.REPORTINGTAXONOMY = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_REPORTINGTAXONOMY);
                ObjectTypeCodelistType.REPORTINGTAXONOMYMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_REPORTINGTAXONOMYMAP);
                ObjectTypeCodelistType.REPORTINGYEARSTARTDAY = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_REPORTINGYEARSTARTDAY);
                ObjectTypeCodelistType.REPORTPERIODTARGET = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_REPORTPERIODTARGET);
                ObjectTypeCodelistType.REPORTSTRUCTURE = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_REPORTSTRUCTURE);
                ObjectTypeCodelistType.STRUCTUREMAP = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_STRUCTUREMAP);
                ObjectTypeCodelistType.STRUCTURESET = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_STRUCTURESET);
                ObjectTypeCodelistType.TIMEDIMENSION = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_TIMEDIMENSION);
                ObjectTypeCodelistType.TRANSITION = ObjectTypeCodelistType.add(ObjectTypeCodelistType.TARGET_TRANSITION);
                ObjectTypeCodelistType.INT_ANY = 0;
                ObjectTypeCodelistType.INT_AGENCY = 1;
                ObjectTypeCodelistType.INT_AGENCYSCHEME = 2;
                ObjectTypeCodelistType.INT_ATTACHMENTCONSTRAINT = 3;
                ObjectTypeCodelistType.INT_ATTRIBUTE = 4;
                ObjectTypeCodelistType.INT_ATTRIBUTEDESCRIPTOR = 5;
                ObjectTypeCodelistType.INT_CATEGORISATION = 6;
                ObjectTypeCodelistType.INT_CATEGORY = 7;
                ObjectTypeCodelistType.INT_CATEGORYSCHEMEMAP = 8;
                ObjectTypeCodelistType.INT_CATEGORYSCHEME = 9;
                ObjectTypeCodelistType.INT_CODE = 10;
                ObjectTypeCodelistType.INT_CODEMAP = 11;
                ObjectTypeCodelistType.INT_CODELIST = 12;
                ObjectTypeCodelistType.INT_CODELISTMAP = 13;
                ObjectTypeCodelistType.INT_COMPONENTMAP = 14;
                ObjectTypeCodelistType.INT_CONCEPT = 15;
                ObjectTypeCodelistType.INT_CONCEPTMAP = 16;
                ObjectTypeCodelistType.INT_CONCEPTSCHEME = 17;
                ObjectTypeCodelistType.INT_CONCEPTSCHEMEMAP = 18;
                ObjectTypeCodelistType.INT_CONSTRAINT = 19;
                ObjectTypeCodelistType.INT_CONSTRAINTARGET = 20;
                ObjectTypeCodelistType.INT_CONTENTCONSTRAINT = 21;
                ObjectTypeCodelistType.INT_DATAFLOW = 22;
                ObjectTypeCodelistType.INT_DATACONSUMER = 23;
                ObjectTypeCodelistType.INT_DATACONSUMERSCHEME = 24;
                ObjectTypeCodelistType.INT_DATAPROVIDER = 25;
                ObjectTypeCodelistType.INT_DATAPROVIDERSCHEME = 26;
                ObjectTypeCodelistType.INT_DATASETTARGET = 27;
                ObjectTypeCodelistType.INT_DATASTRUCTURE = 28;
                ObjectTypeCodelistType.INT_DIMENSION = 29;
                ObjectTypeCodelistType.INT_DIMENSIONDESCRIPTOR = 30;
                ObjectTypeCodelistType.INT_DIMENSIONDESCRIPTORVALUESTARGET = 31;
                ObjectTypeCodelistType.INT_GROUPDIMENSIONDESCRIPTOR = 32;
                ObjectTypeCodelistType.INT_HIERARCHICALCODE = 33;
                ObjectTypeCodelistType.INT_HIERARCHICALCODELIST = 34;
                ObjectTypeCodelistType.INT_HIERARCHY = 35;
                ObjectTypeCodelistType.INT_HYBRIDCODELISTMAP = 36;
                ObjectTypeCodelistType.INT_HYBRIDCODEMAP = 37;
                ObjectTypeCodelistType.INT_IDENTIFIABLEOBJECTTARGET = 38;
                ObjectTypeCodelistType.INT_LEVEL = 39;
                ObjectTypeCodelistType.INT_MEASUREDESCRIPTOR = 40;
                ObjectTypeCodelistType.INT_MEASUREDIMENSION = 41;
                ObjectTypeCodelistType.INT_METADATAFLOW = 42;
                ObjectTypeCodelistType.INT_METADATAATTRIBUTE = 43;
                ObjectTypeCodelistType.INT_METADATASET = 44;
                ObjectTypeCodelistType.INT_METADATASTRUCTURE = 45;
                ObjectTypeCodelistType.INT_METADATATARGET = 46;
                ObjectTypeCodelistType.INT_ORGANISATION = 47;
                ObjectTypeCodelistType.INT_ORGANISATIONMAP = 48;
                ObjectTypeCodelistType.INT_ORGANISATIONSCHEME = 49;
                ObjectTypeCodelistType.INT_ORGANISATIONSCHEMEMAP = 50;
                ObjectTypeCodelistType.INT_ORGANISATIONUNIT = 51;
                ObjectTypeCodelistType.INT_ORGANISATIONUNITSCHEME = 52;
                ObjectTypeCodelistType.INT_PRIMARYMEASURE = 53;
                ObjectTypeCodelistType.INT_PROCESS = 54;
                ObjectTypeCodelistType.INT_PROCESSSTEP = 55;
                ObjectTypeCodelistType.INT_PROVISIONAGREEMENT = 56;
                ObjectTypeCodelistType.INT_REPORTINGCATEGORY = 57;
                ObjectTypeCodelistType.INT_REPORTINGCATEGORYMAP = 58;
                ObjectTypeCodelistType.INT_REPORTINGTAXONOMY = 59;
                ObjectTypeCodelistType.INT_REPORTINGTAXONOMYMAP = 60;
                ObjectTypeCodelistType.INT_REPORTINGYEARSTARTDAY = 61;
                ObjectTypeCodelistType.INT_REPORTPERIODTARGET = 62;
                ObjectTypeCodelistType.INT_REPORTSTRUCTURE = 63;
                ObjectTypeCodelistType.INT_STRUCTUREMAP = 64;
                ObjectTypeCodelistType.INT_STRUCTURESET = 65;
                ObjectTypeCodelistType.INT_TIMEDIMENSION = 66;
                ObjectTypeCodelistType.INT_TRANSITION = 67;
                return ObjectTypeCodelistType;
            })();
            type.ObjectTypeCodelistType = ObjectTypeCodelistType;
        })(type = commonreferences.type || (commonreferences.type = {}));
    })(commonreferences = sdmx.commonreferences || (sdmx.commonreferences = {}));
})(sdmx || (sdmx = {}));

//# sourceMappingURL=ObjectTypeCodelistType.js.map
