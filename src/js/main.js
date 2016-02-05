//main.js contents
//Pass a config object to require
require.config({
    baseUrl: '../src/js/',
    paths: {
      'compute': 'compute/main'
    }
});

require(["sdmx","sdmx/commonreferences","sdmx/sdmx20"],
function (sdmx) {
   var d1 = new Date();
   var s = "<message:Structure xmlns=\"http://www.SDMX.org/resources/SDMXML/schemas/v2_0/structure\" xmlns:message=\"http://www.SDMX.org/resources/SDMXML/schemas/v2_0/message\" xsi:schemaLocation=\"http://www.SDMX.org/resources/SDMXML/schemas/v2_0/structure http://www.sdmx.org/docs/2_0/SDMXStructure.xsd http://www.SDMX.org/resources/SDMXML/schemas/v2_0/message http://www.sdmx.org/docs/2_0/SDMXMessage.xsd\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"><Header xmlns=\"http://www.SDMX.org/resources/SDMXML/schemas/v2_0/message\"><ID>none</ID><Test>false</Test><Truncated>false</Truncated><Prepared>2010-11-04T11:52:46</Prepared><Sender id=\"ABS\"><Name xml:lang=\"en\">Australian Bureau of Statistics</Name></Sender></Header><message:CodeLists><CodeList id=\"CL_DSID1230571_OBS_STATUS\" agencyID=\"ABS\"><Name xml:lang=\"en\">Observation Status</Name><Name xml:lang=\"fr\">Statut d'observation</Name></CodeList><CodeList id=\"CL_DSID1230571_CURRENCY\" agencyID=\"ABS\"><Name xml:lang=\"en\">DSID1230571_CURRENCY codelist</Name><Code value=\"700\"><Description xml:lang=\"en\">700: Australian Dollar</Description><Description xml:lang=\"fr\">700: 700</Description></Code><Code value=\"101\"><Description xml:lang=\"en\">101: United States Dollar</Description><Description xml:lang=\"fr\">101: 101</Description></Code><Code value=\"668\"><Description xml:lang=\"en\">668: Japanese Yen</Description><Description xml:lang=\"fr\">668: 668</Description></Code><Code value=\"313\"><Description xml:lang=\"en\">313: United Kingdom Pound</Description><Description xml:lang=\"fr\">313: 313</Description></Code><Code value=\"1706\"><Description xml:lang=\"en\">1706: Euro</Description><Description xml:lang=\"fr\">1706: 1706</Description></Code><Code value=\"312\"><Description xml:lang=\"en\">312: Swiss Franc</Description><Description xml:lang=\"fr\">312: 312</Description></Code><Code value=\"1703\"><Description xml:lang=\"en\">1703: Other</Description><Description xml:lang=\"fr\">1703: 1703</Description></Code><Code value=\"XXX\"><Description xml:lang=\"en\">XXX: Reserve Assets</Description><Description xml:lang=\"fr\">XXX: XXX</Description></Code><Code value=\"1704\"><Description xml:lang=\"en\">1704: Total</Description><Description xml:lang=\"fr\">1704: 1704</Description></Code></CodeList><CodeList id=\"CL_DSID1230571_IIP_DATA\" agencyID=\"ABS\"><Name xml:lang=\"en\">DSID1230571_IIP_DATA codelist</Name><Code value=\"901AM\"><Description xml:lang=\"en\">901AM: ASSETS</Description><Description xml:lang=\"fr\">901AM: 901AM</Description></Code><Code value=\"903AM\"><Description xml:lang=\"en\">903AM: LIABILITIES</Description><Description xml:lang=\"fr\">903AM: 903AM</Description></Code></CodeList><CodeList id=\"CL_DSID1230571_MATURITY\" agencyID=\"ABS\"><Name xml:lang=\"en\">DSID1230571_MATURITY codelist</Name><Code value=\"10\"><Description xml:lang=\"en\">10: Less than or up to 90 days</Description><Description xml:lang=\"fr\">10: 10</Description></Code><Code value=\"20\"><Description xml:lang=\"en\">20: Greater than 90 days and up to 6 months</Description><Description xml:lang=\"fr\">20: 20</Description></Code><Code value=\"30\"><Description xml:lang=\"en\">30: Greater than 6 months and up to 1 year</Description><Description xml:lang=\"fr\">30: 30</Description></Code><Code value=\"40\"><Description xml:lang=\"en\">40: Greater than 1 year and up to 5 years</Description><Description xml:lang=\"fr\">40: 40</Description></Code><Code value=\"50\"><Description xml:lang=\"en\">50: Greater than 5 years</Description><Description xml:lang=\"fr\">50: 50</Description></Code><Code value=\"100\"><Description xml:lang=\"en\">100: Total</Description><Description xml:lang=\"fr\">100: 100</Description></Code></CodeList><CodeList id=\"CL_DSID1230571_TIME\" agencyID=\"ABS\"><Name xml:lang=\"en\">DSID1230571_TIME codelist</Name><Code value=\"1996\"><Description xml:lang=\"en\">1996</Description><Description xml:lang=\"fr\">1996</Description></Code><Code value=\"1996-B2\" parentCode=\"1996\"><Description xml:lang=\"en\">S2-1996</Description><Description xml:lang=\"fr\">S2-1996</Description></Code><Code value=\"1996-Q3\" parentCode=\"1996-B2\"><Description xml:lang=\"en\">Q3-1996</Description><Description xml:lang=\"fr\">T3-1996</Description></Code><Code value=\"1996-Q4\" parentCode=\"1996-B2\"><Description xml:lang=\"en\">Q4-1996</Description><Description xml:lang=\"fr\">T4-1996</Description></Code><Code value=\"1997\"><Description xml:lang=\"en\">1997</Description><Description xml:lang=\"fr\">1997</Description></Code><Code value=\"1997-B1\" parentCode=\"1997\"><Description xml:lang=\"en\">S1-1997</Description><Description xml:lang=\"fr\">S1-1997</Description></Code><Code value=\"1997-Q1\" parentCode=\"1997-B1\"><Description xml:lang=\"en\">Q1-1997</Description><Description xml:lang=\"fr\">T1-1997</Description></Code><Code value=\"1997-Q2\" parentCode=\"1997-B1\"><Description xml:lang=\"en\">Q2-1997</Description><Description xml:lang=\"fr\">T2-1997</Description></Code><Code value=\"1997-B2\" parentCode=\"1997\"><Description xml:lang=\"en\">S2-1997</Description><Description xml:lang=\"fr\">S2-1997</Description></Code><Code value=\"1997-Q3\" parentCode=\"1997-B2\"><Description xml:lang=\"en\">Q3-1997</Description><Description xml:lang=\"fr\">T3-1997</Description></Code><Code value=\"1997-Q4\" parentCode=\"1997-B2\"><Description xml:lang=\"en\">Q4-1997</Description><Description xml:lang=\"fr\">T4-1997</Description></Code><Code value=\"1998\"><Description xml:lang=\"en\">1998</Description><Description xml:lang=\"fr\">1998</Description></Code><Code value=\"1998-B1\" parentCode=\"1998\"><Description xml:lang=\"en\">S1-1998</Description><Description xml:lang=\"fr\">S1-1998</Description></Code><Code value=\"1998-Q1\" parentCode=\"1998-B1\"><Description xml:lang=\"en\">Q1-1998</Description><Description xml:lang=\"fr\">T1-1998</Description></Code><Code value=\"1998-Q2\" parentCode=\"1998-B1\"><Description xml:lang=\"en\">Q2-1998</Description><Description xml:lang=\"fr\">T2-1998</Description></Code><Code value=\"1998-B2\" parentCode=\"1998\"><Description xml:lang=\"en\">S2-1998</Description><Description xml:lang=\"fr\">S2-1998</Description></Code><Code value=\"1998-Q3\" parentCode=\"1998-B2\"><Description xml:lang=\"en\">Q3-1998</Description><Description xml:lang=\"fr\">T3-1998</Description></Code><Code value=\"1998-Q4\" parentCode=\"1998-B2\"><Description xml:lang=\"en\">Q4-1998</Description><Description xml:lang=\"fr\">T4-1998</Description></Code><Code value=\"1999\"><Description xml:lang=\"en\">1999</Description><Description xml:lang=\"fr\">1999</Description></Code><Code value=\"1999-B1\" parentCode=\"1999\"><Description xml:lang=\"en\">S1-1999</Description><Description xml:lang=\"fr\">S1-1999</Description></Code><Code value=\"1999-Q1\" parentCode=\"1999-B1\"><Description xml:lang=\"en\">Q1-1999</Description><Description xml:lang=\"fr\">T1-1999</Description></Code><Code value=\"1999-Q2\" parentCode=\"1999-B1\"><Description xml:lang=\"en\">Q2-1999</Description><Description xml:lang=\"fr\">T2-1999</Description></Code><Code value=\"1999-B2\" parentCode=\"1999\"><Description xml:lang=\"en\">S2-1999</Description><Description xml:lang=\"fr\">S2-1999</Description></Code><Code value=\"1999-Q3\" parentCode=\"1999-B2\"><Description xml:lang=\"en\">Q3-1999</Description><Description xml:lang=\"fr\">T3-1999</Description></Code><Code value=\"1999-Q4\" parentCode=\"1999-B2\"><Description xml:lang=\"en\">Q4-1999</Description><Description xml:lang=\"fr\">T4-1999</Description></Code><Code value=\"2000\"><Description xml:lang=\"en\">2000</Description><Description xml:lang=\"fr\">2000</Description></Code><Code value=\"2000-B1\" parentCode=\"2000\"><Description xml:lang=\"en\">S1-2000</Description><Description xml:lang=\"fr\">S1-2000</Description></Code><Code value=\"2000-Q1\" parentCode=\"2000-B1\"><Description xml:lang=\"en\">Q1-2000</Description><Description xml:lang=\"fr\">T1-2000</Description></Code><Code value=\"2000-Q2\" parentCode=\"2000-B1\"><Description xml:lang=\"en\">Q2-2000</Description><Description xml:lang=\"fr\">T2-2000</Description></Code><Code value=\"2000-B2\" parentCode=\"2000\"><Description xml:lang=\"en\">S2-2000</Description><Description xml:lang=\"fr\">S2-2000</Description></Code><Code value=\"2000-Q3\" parentCode=\"2000-B2\"><Description xml:lang=\"en\">Q3-2000</Description><Description xml:lang=\"fr\">T3-2000</Description></Code><Code value=\"2000-Q4\" parentCode=\"2000-B2\"><Description xml:lang=\"en\">Q4-2000</Description><Description xml:lang=\"fr\">T4-2000</Description></Code><Code value=\"2001\"><Description xml:lang=\"en\">2001</Description><Description xml:lang=\"fr\">2001</Description></Code><Code value=\"2001-B1\" parentCode=\"2001\"><Description xml:lang=\"en\">S1-2001</Description><Description xml:lang=\"fr\">S1-2001</Description></Code><Code value=\"2001-Q1\" parentCode=\"2001-B1\"><Description xml:lang=\"en\">Q1-2001</Description><Description xml:lang=\"fr\">T1-2001</Description></Code><Code value=\"2001-Q2\" parentCode=\"2001-B1\"><Description xml:lang=\"en\">Q2-2001</Description><Description xml:lang=\"fr\">T2-2001</Description></Code><Code value=\"2001-B2\" parentCode=\"2001\"><Description xml:lang=\"en\">S2-2001</Description><Description xml:lang=\"fr\">S2-2001</Description></Code><Code value=\"2001-Q3\" parentCode=\"2001-B2\"><Description xml:lang=\"en\">Q3-2001</Description><Description xml:lang=\"fr\">T3-2001</Description></Code><Code value=\"2001-Q4\" parentCode=\"2001-B2\"><Description xml:lang=\"en\">Q4-2001</Description><Description xml:lang=\"fr\">T4-2001</Description></Code><Code value=\"2002\"><Description xml:lang=\"en\">2002</Description><Description xml:lang=\"fr\">2002</Description></Code><Code value=\"2002-B1\" parentCode=\"2002\"><Description xml:lang=\"en\">S1-2002</Description><Description xml:lang=\"fr\">S1-2002</Description></Code><Code value=\"2002-Q1\" parentCode=\"2002-B1\"><Description xml:lang=\"en\">Q1-2002</Description><Description xml:lang=\"fr\">T1-2002</Description></Code><Code value=\"2002-Q2\" parentCode=\"2002-B1\"><Description xml:lang=\"en\">Q2-2002</Description><Description xml:lang=\"fr\">T2-2002</Description></Code><Code value=\"2002-B2\" parentCode=\"2002\"><Description xml:lang=\"en\">S2-2002</Description><Description xml:lang=\"fr\">S2-2002</Description></Code><Code value=\"2002-Q3\" parentCode=\"2002-B2\"><Description xml:lang=\"en\">Q3-2002</Description><Description xml:lang=\"fr\">T3-2002</Description></Code><Code value=\"2002-Q4\" parentCode=\"2002-B2\"><Description xml:lang=\"en\">Q4-2002</Description><Description xml:lang=\"fr\">T4-2002</Description></Code><Code value=\"2003\"><Description xml:lang=\"en\">2003</Description><Description xml:lang=\"fr\">2003</Description></Code><Code value=\"2003-B1\" parentCode=\"2003\"><Description xml:lang=\"en\">S1-2003</Description><Description xml:lang=\"fr\">S1-2003</Description></Code><Code value=\"2003-Q1\" parentCode=\"2003-B1\"><Description xml:lang=\"en\">Q1-2003</Description><Description xml:lang=\"fr\">T1-2003</Description></Code><Code value=\"2003-Q2\" parentCode=\"2003-B1\"><Description xml:lang=\"en\">Q2-2003</Description><Description xml:lang=\"fr\">T2-2003</Description></Code><Code value=\"2003-B2\" parentCode=\"2003\"><Description xml:lang=\"en\">S2-2003</Description><Description xml:lang=\"fr\">S2-2003</Description></Code><Code value=\"2003-Q3\" parentCode=\"2003-B2\"><Description xml:lang=\"en\">Q3-2003</Description><Description xml:lang=\"fr\">T3-2003</Description></Code><Code value=\"2003-Q4\" parentCode=\"2003-B2\"><Description xml:lang=\"en\">Q4-2003</Description><Description xml:lang=\"fr\">T4-2003</Description></Code><Code value=\"2004\"><Description xml:lang=\"en\">2004</Description><Description xml:lang=\"fr\">2004</Description></Code><Code value=\"2004-B1\" parentCode=\"2004\"><Description xml:lang=\"en\">S1-2004</Description><Description xml:lang=\"fr\">S1-2004</Description></Code><Code value=\"2004-Q1\" parentCode=\"2004-B1\"><Description xml:lang=\"en\">Q1-2004</Description><Description xml:lang=\"fr\">T1-2004</Description></Code><Code value=\"2004-Q2\" parentCode=\"2004-B1\"><Description xml:lang=\"en\">Q2-2004</Description><Description xml:lang=\"fr\">T2-2004</Description></Code><Code value=\"2004-B2\" parentCode=\"2004\"><Description xml:lang=\"en\">S2-2004</Description><Description xml:lang=\"fr\">S2-2004</Description></Code><Code value=\"2004-Q3\" parentCode=\"2004-B2\"><Description xml:lang=\"en\">Q3-2004</Description><Description xml:lang=\"fr\">T3-2004</Description></Code><Code value=\"2004-Q4\" parentCode=\"2004-B2\"><Description xml:lang=\"en\">Q4-2004</Description><Description xml:lang=\"fr\">T4-2004</Description></Code><Code value=\"2005\"><Description xml:lang=\"en\">2005</Description><Description xml:lang=\"fr\">2005</Description></Code><Code value=\"2005-B1\" parentCode=\"2005\"><Description xml:lang=\"en\">S1-2005</Description><Description xml:lang=\"fr\">S1-2005</Description></Code><Code value=\"2005-Q1\" parentCode=\"2005-B1\"><Description xml:lang=\"en\">Q1-2005</Description><Description xml:lang=\"fr\">T1-2005</Description></Code><Code value=\"2005-Q2\" parentCode=\"2005-B1\"><Description xml:lang=\"en\">Q2-2005</Description><Description xml:lang=\"fr\">T2-2005</Description></Code><Code value=\"2005-B2\" parentCode=\"2005\"><Description xml:lang=\"en\">S2-2005</Description><Description xml:lang=\"fr\">S2-2005</Description></Code><Code value=\"2005-Q3\" parentCode=\"2005-B2\"><Description xml:lang=\"en\">Q3-2005</Description><Description xml:lang=\"fr\">T3-2005</Description></Code><Code value=\"2005-Q4\" parentCode=\"2005-B2\"><Description xml:lang=\"en\">Q4-2005</Description><Description xml:lang=\"fr\">T4-2005</Description></Code><Code value=\"2006\"><Description xml:lang=\"en\">2006</Description><Description xml:lang=\"fr\">2006</Description></Code><Code value=\"2006-B1\" parentCode=\"2006\"><Description xml:lang=\"en\">S1-2006</Description><Description xml:lang=\"fr\">S1-2006</Description></Code><Code value=\"2006-Q1\" parentCode=\"2006-B1\"><Description xml:lang=\"en\">Q1-2006</Description><Description xml:lang=\"fr\">T1-2006</Description></Code><Code value=\"2006-Q2\" parentCode=\"2006-B1\"><Description xml:lang=\"en\">Q2-2006</Description><Description xml:lang=\"fr\">T2-2006</Description></Code><Code value=\"2006-B2\" parentCode=\"2006\"><Description xml:lang=\"en\">S2-2006</Description><Description xml:lang=\"fr\">S2-2006</Description></Code><Code value=\"2006-Q3\" parentCode=\"2006-B2\"><Description xml:lang=\"en\">Q3-2006</Description><Description xml:lang=\"fr\">T3-2006</Description></Code><Code value=\"2006-Q4\" parentCode=\"2006-B2\"><Description xml:lang=\"en\">Q4-2006</Description><Description xml:lang=\"fr\">T4-2006</Description></Code><Code value=\"2007\"><Description xml:lang=\"en\">2007</Description><Description xml:lang=\"fr\">2007</Description></Code><Code value=\"2007-B1\" parentCode=\"2007\"><Description xml:lang=\"en\">S1-2007</Description><Description xml:lang=\"fr\">S1-2007</Description></Code><Code value=\"2007-Q1\" parentCode=\"2007-B1\"><Description xml:lang=\"en\">Q1-2007</Description><Description xml:lang=\"fr\">T1-2007</Description></Code><Code value=\"2007-Q2\" parentCode=\"2007-B1\"><Description xml:lang=\"en\">Q2-2007</Description><Description xml:lang=\"fr\">T2-2007</Description></Code><Code value=\"2007-B2\" parentCode=\"2007\"><Description xml:lang=\"en\">S2-2007</Description><Description xml:lang=\"fr\">S2-2007</Description></Code><Code value=\"2007-Q3\" parentCode=\"2007-B2\"><Description xml:lang=\"en\">Q3-2007</Description><Description xml:lang=\"fr\">T3-2007</Description></Code><Code value=\"2007-Q4\" parentCode=\"2007-B2\"><Description xml:lang=\"en\">Q4-2007</Description><Description xml:lang=\"fr\">T4-2007</Description></Code><Code value=\"2008\"><Description xml:lang=\"en\">2008</Description><Description xml:lang=\"fr\">2008</Description></Code><Code value=\"2008-B1\" parentCode=\"2008\"><Description xml:lang=\"en\">S1-2008</Description><Description xml:lang=\"fr\">S1-2008</Description></Code><Code value=\"2008-Q1\" parentCode=\"2008-B1\"><Description xml:lang=\"en\">Q1-2008</Description><Description xml:lang=\"fr\">T1-2008</Description></Code><Code value=\"2008-Q2\" parentCode=\"2008-B1\"><Description xml:lang=\"en\">Q2-2008</Description><Description xml:lang=\"fr\">T2-2008</Description></Code><Code value=\"2008-B2\" parentCode=\"2008\"><Description xml:lang=\"en\">S2-2008</Description><Description xml:lang=\"fr\">S2-2008</Description></Code><Code value=\"2008-Q3\" parentCode=\"2008-B2\"><Description xml:lang=\"en\">Q3-2008</Description><Description xml:lang=\"fr\">T3-2008</Description></Code><Code value=\"2008-Q4\" parentCode=\"2008-B2\"><Description xml:lang=\"en\">Q4-2008</Description><Description xml:lang=\"fr\">T4-2008</Description></Code><Code value=\"2009\"><Description xml:lang=\"en\">2009</Description><Description xml:lang=\"fr\">2009</Description></Code><Code value=\"2009-B1\" parentCode=\"2009\"><Description xml:lang=\"en\">S1-2009</Description><Description xml:lang=\"fr\">S1-2009</Description></Code><Code value=\"2009-Q1\" parentCode=\"2009-B1\"><Description xml:lang=\"en\">Q1-2009</Description><Description xml:lang=\"fr\">T1-2009</Description></Code><Code value=\"2009-Q2\" parentCode=\"2009-B1\"><Description xml:lang=\"en\">Q2-2009</Description><Description xml:lang=\"fr\">T2-2009</Description></Code><Code value=\"2009-B2\" parentCode=\"2009\"><Description xml:lang=\"en\">S2-2009</Description><Description xml:lang=\"fr\">S2-2009</Description></Code><Code value=\"2009-Q3\" parentCode=\"2009-B2\"><Description xml:lang=\"en\">Q3-2009</Description><Description xml:lang=\"fr\">T3-2009</Description></Code><Code value=\"2009-Q4\" parentCode=\"2009-B2\"><Description xml:lang=\"en\">Q4-2009</Description><Description xml:lang=\"fr\">T4-2009</Description></Code><Code value=\"2010\"><Description xml:lang=\"en\">2010</Description><Description xml:lang=\"fr\">2010</Description></Code><Code value=\"2010-B1\" parentCode=\"2010\"><Description xml:lang=\"en\">S1-2010</Description><Description xml:lang=\"fr\">S1-2010</Description></Code><Code value=\"2010-Q1\" parentCode=\"2010-B1\"><Description xml:lang=\"en\">Q1-2010</Description><Description xml:lang=\"fr\">T1-2010</Description></Code></CodeList></message:CodeLists><message:Concepts><Concept id=\"CURRENCY\" agencyID=\"ABS\"><Name xml:lang=\"en\">Currency code</Name><Name xml:lang=\"fr\">Currency code</Name></Concept><Concept id=\"IIP_DATA\" agencyID=\"ABS\"><Name xml:lang=\"en\">Investment code</Name><Name xml:lang=\"fr\">Investment code</Name></Concept><Concept id=\"MATURITY\" agencyID=\"ABS\"><Name xml:lang=\"en\">Maturity code</Name><Name xml:lang=\"fr\">Maturity code</Name></Concept><Concept id=\"TIME\" agencyID=\"ABS\"><Name xml:lang=\"en\">Quarter</Name><Name xml:lang=\"fr\">Quarter</Name></Concept><Concept id=\"OBS_STATUS\" agencyID=\"ABS\"><Name xml:lang=\"en\">Observation Status</Name><Name xml:lang=\"fr\">Statut d'observation</Name></Concept><Concept id=\"UNIT\" agencyID=\"ABS\"><Name xml:lang=\"en\">Unit</Name><Name xml:lang=\"fr\">Unit�</Name></Concept><Concept id=\"POWERCODE\" agencyID=\"ABS\"><Name xml:lang=\"en\">Unit multplier</Name><Name xml:lang=\"fr\">Unit� multiplicateur</Name></Concept><Concept id=\"OBS_VALUE\" agencyID=\"OECD\"><Name xml:lang=\"en\">Observation Value</Name><Name xml:lang=\"fr\">Valeur d'observation</Name></Concept></message:Concepts><message:KeyFamilies><KeyFamily id=\"DSID1230571\" agencyID=\"ABS\"><Name xml:lang=\"en\">International Investment: Quarterly, Currency and Residual Maturity of Foreign Debt, Original, All sectors</Name><Name xml:lang=\"fr\">International Investment: Quarterly, Currency and Residual Maturity of Foreign Debt</Name><Components><Dimension conceptRef=\"CURRENCY\" codelist=\"CL_DSID1230571_CURRENCY\" /><Dimension conceptRef=\"IIP_DATA\" codelist=\"CL_DSID1230571_IIP_DATA\" /><Dimension conceptRef=\"MATURITY\" codelist=\"CL_DSID1230571_MATURITY\" /><TimeDimension conceptRef=\"TIME\" codelist=\"CL_DSID1230571_TIME\" /><PrimaryMeasure conceptRef=\"OBS_VALUE\"><TextFormat textType=\"Double\" /></PrimaryMeasure><Attribute conceptRef=\"OBS_STATUS\" codelist=\"CL_DSID1230571_OBS_STATUS\" attachmentLevel=\"Observation\" assignmentStatus=\"Conditional\" /><Attribute conceptRef=\"UNIT\" attachmentLevel=\"Series\" assignmentStatus=\"Conditional\" /><Attribute conceptRef=\"POWERCODE\" attachmentLevel=\"Series\" assignmentStatus=\"Conditional\" /></Components></KeyFamily></message:KeyFamilies></message:Structure>";
   sdmx.SdmxIO.parseStructure(s);
   var d2 = new Date();
   alert( d2.getTime()-d1.getTime());

});