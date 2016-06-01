/*
    This file is part of sdmx-js.

    sdmx-js is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    sdmx-js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with sdmx-js.  If not, see <http://www.gnu.org/licenses/>.
    Copyright (C) 2016 James Gardner
*/
//<reference path="../moment.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    var TimeUtil = (function () {
        function TimeUtil() {
        }
        TimeUtil.stringToMonthCode = function (s) {
            for (var i = 0; i < TimeUtil.LONG_MONTH_NAMES.length; i++) {
                if (TimeUtil.LONG_MONTH_NAMES[i] == s)
                    return collections.arrays.indexOf(TimeUtil.LONG_MONTH_NAMES, s);
            }
            for (var i = 0; i < TimeUtil.SHORT_MONTH_NAMES.length; i++) {
                if (TimeUtil.SHORT_MONTH_NAMES[i] == s)
                    return collections.arrays.indexOf(TimeUtil.SHORT_MONTH_NAMES, s);
            }
            return 1;
        };
        /* notes from Edgardo Greising from ILO.org
            The concept of Time Format is sometimes tied to the frequency,
            but more precisely to the reference period of the datum.
            In our case the time format can be taken from the time value
            which is stored in a proprietary extension of the ISO 8601 format
            that we call "User format". It is defined as [YYYY] for years (Ex.: 2009),
            [YYYY]Q[Q] for quarters (Ex.: 2011Q3) and [YYYY]M[MM] for months (Ex.: 2014M06).
            So the fourth character of the TIME concept value gives the reference period:
            Yearly (by absence), Quarterly or Monthly. We can also use other codes to represent
            other periods like S for Semesters or W for weeks, but we don't have this type of
            data so far. In any case, the valid codes are in the CL_FREQ codelist.
        */
        TimeUtil.parseTime = function (freq, s) {
            if ("" == s) {
                throw new Error("Time Detail of \'\'");
            }
            try {
                if ("A" == freq || "P1Y" == freq) {
                    return Year.parseYear(s);
                }
                else if ("M" == freq || "P1M" == freq) {
                    return Month.parseMonth(s);
                } /*
                 else if ("Q".equals(freq) || "P3M".equals(freq)) {
                    return Quarter.parseQuarter(s);
                } else if ("S".equals(freq) || "P6M".equals(freq)) {
                    return Semester.parseSemester(s);
                } else if ("W".equals(freq) || "P1W".equals(freq)) {
                    return Week.parseWeek(s);
                }*/
            }
            catch (e) {
                console.log("Time:" + s + " is not a format for freq:" + freq);
            }
            var rtd = null;
            try {
                rtd = Year.parseYear(s);
            }
            catch (e) {
            }
            if (rtd != null) {
                return rtd;
            }
            /*
            try {
                rtd = Day.parseDay(s);
            } catch (TimePeriodFormatException tpe) {
            }catch(StringIndexOutOfBoundsException sioob) {
            }
            if (rtd != null) {
                return rtd;
            }
            */
            try {
                rtd = Month.parseMonth(s);
            }
            catch (e) {
            }
            if (rtd != null) {
                return rtd;
            }
            /*
            try {
                rtd = Quarter.parseQuarter(s);
            } catch (TimePeriodFormatException tpe) {
            }catch(StringIndexOutOfBoundsException sioob) {
            }
            if (rtd != null) {
                return rtd;
            }
            try {
                rtd = Semester.parseSemester(s);
            } catch (TimePeriodFormatException tpe) {
            }catch(StringIndexOutOfBoundsException sioob) {
            }
            if (rtd != null) {
                return rtd;
            }
            try {
                rtd = Week.parseWeek(s);
            } catch (TimePeriodFormatException tpe) {
            }catch(StringIndexOutOfBoundsException sioob) {
            }
            if (rtd != null) {
                return rtd;
            }
            */
            throw new Error("Null Frequency Field");
        };
        TimeUtil.LONG_MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        TimeUtil.SHORT_MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return TimeUtil;
    })();
    exports.TimeUtil = TimeUtil;
    var AbstractRegularTimePeriod = (function () {
        function AbstractRegularTimePeriod() {
        }
        AbstractRegularTimePeriod.prototype.next = function () {
            return null;
        };
        AbstractRegularTimePeriod.prototype.previous = function () {
            return null;
        };
        AbstractRegularTimePeriod.prototype.getSerialIndex = function () {
            return 0;
        };
        /**
         * Returns the date/time that marks the start of the time period.  This
         * method returns a new <code>Date</code> instance every time it is called.
         *
         * @return The start date/time.
         *
         * @see #getFirstMillisecond()
         */
        AbstractRegularTimePeriod.prototype.getStart = function () {
            return new Date(this.getFirstMillisecond());
        };
        /**
         * Returns the date/time that marks the end of the time period.  This
         * method returns a new <code>Date</code> instance every time it is called.
         *
         * @return The end date/time.
         *
         * @see #getLastMillisecond()
         */
        AbstractRegularTimePeriod.prototype.getEnd = function () {
            return new Date(this.getLastMillisecond());
        };
        AbstractRegularTimePeriod.prototype.getFirstMillisecond = function () {
            return 0;
        };
        ;
        /**
         * Returns the last millisecond of the time period.  This will be
         * determined relative to the time zone specified in the constructor, or
         * in the calendar instance passed in the most recent call to the
         * {@link #peg(Calendar)} method.
         *
         * @return The last millisecond of the time period.
         *
         * @see #getFirstMillisecond()
         */
        AbstractRegularTimePeriod.prototype.getLastMillisecond = function () {
            return 0;
        };
        /**
         * Returns the millisecond closest to the middle of the time period.
         *
         * @return The middle millisecond.
         */
        AbstractRegularTimePeriod.prototype.getMiddleMillisecond = function () {
            var m1 = this.getFirstMillisecond();
            var m2 = this.getLastMillisecond();
            return m1 + (m2 - m1) / 2;
        };
        AbstractRegularTimePeriod.prototype.toString = function () {
            return this.getStart().toString();
        };
        return AbstractRegularTimePeriod;
    })();
    exports.AbstractRegularTimePeriod = AbstractRegularTimePeriod;
    var MonthConstants = (function () {
        function MonthConstants() {
        }
        MonthConstants.toMonthName = function (i) {
            switch (i) {
                case this.JANUARY: return "January";
                case this.FEBRUARY: return "February";
                case this.MARCH: return "March";
                case this.APRIL: return "April";
                case this.MAY: return "May";
                case this.JUNE: return "June";
                case this.JULY: return "July";
                case this.AUGUST: return "August";
                case this.SEPTEMBER: return "September";
                case this.OCTOBER: return "October";
                case this.NOVEMBER: return "November";
                case this.DECEMBER: return "December";
                default: return "Not A Month";
            }
        };
        MonthConstants.JANUARY = 1;
        MonthConstants.FEBRUARY = 2;
        MonthConstants.MARCH = 3;
        MonthConstants.APRIL = 4;
        MonthConstants.MAY = 5;
        MonthConstants.JUNE = 6;
        MonthConstants.JULY = 7;
        MonthConstants.AUGUST = 8;
        MonthConstants.SEPTEMBER = 9;
        MonthConstants.OCTOBER = 10;
        MonthConstants.NOVEMBER = 11;
        MonthConstants.DECEMBER = 12;
        return MonthConstants;
    })();
    exports.MonthConstants = MonthConstants;
    /**
     * Represents a year in the range -9999 to 9999.  This class is immutable,
     * which is a requirement for all {@link RegularTimePeriod} subclasses.
     */
    var Year = (function (_super) {
        __extends(Year, _super);
        /**
         * Creates a time period representing a single year.
         *
         * @param year  the year.
         */
        function Year(year) {
            _super.call(this);
            if ((year < Year.MINIMUM_YEAR) || (year > Year.MAXIMUM_YEAR)) {
                throw new Error("Year constructor: year (" + year + ") outside valid range.");
            }
            this.year = year;
            var start = new Date();
            start.setFullYear(year, MonthConstants.JANUARY, 1);
            this.firstMillisecond = start.getTime();
            var end = new Date();
            end.setFullYear(year, MonthConstants.DECEMBER, 31);
            this.lastMillisecond = end.getTime();
        }
        /**
         * Returns the year.
         *
         * @return The year.
         */
        Year.prototype.getYear = function () {
            return this.year;
        };
        /**
         * Returns the first millisecond of the year.  This will be determined
         * relative to the time zone specified in the constructor, or in the
         * calendar instance passed in the most recent call to the
         * {@link #peg(Calendar)} method.
         *
         * @return The first millisecond of the year.
         *
         * @see #getLastMillisecond()
         */
        Year.prototype.getFirstMillisecond = function () {
            return this.firstMillisecond;
        };
        /**
         * Returns the last millisecond of the year.  This will be
         * determined relative to the time zone specified in the constructor, or
         * in the calendar instance passed in the most recent call to the
         * {@link #peg(Calendar)} method.
         *
         * @return The last millisecond of the year.
         *
         * @see #getFirstMillisecond()
         */
        Year.prototype.getLastMillisecond = function () {
            return this.lastMillisecond;
        };
        /**
         * Returns the year preceding this one.
         *
         * @return The year preceding this one (or <code>null</code> if the
         *         current year is -9999).
         */
        Year.prototype.previous = function () {
            if (this.year > Year.MINIMUM_YEAR) {
                return new Year(this.year - 1);
            }
            else {
                return null;
            }
        };
        /**
         * Returns the year following this one.
         *
         * @return The year following this one (or <code>null</code> if the current
         *         year is 9999).
         */
        Year.prototype.next = function () {
            if (this.year < Year.MAXIMUM_YEAR) {
                return new Year(this.year + 1);
            }
            else {
                return null;
            }
        };
        /**
         * Returns a serial index number for the year.
         * <P>
         * The implementation simply returns the year number (e.g. 2002).
         *
         * @return The serial index number.
         */
        Year.prototype.getSerialIndex = function () {
            return this.year;
        };
        /**
         * Tests the equality of this <code>Year</code> object to an arbitrary
         * object.  Returns <code>true</code> if the target is a <code>Year</code>
         * instance representing the same year as this object.  In all other cases,
         * returns <code>false</code>.
         *
         * @param obj  the object (<code>null</code> permitted).
         *
         * @return <code>true</code> if the year of this and the object are the
         *         same.
         */
        Year.prototype.equalsYear = function (obj) {
            if (obj == this) {
                return true;
            }
            if (!(obj instanceof Year)) {
                return false;
            }
            var that = obj;
            return (this.year == that.year);
        };
        /**
         * Returns a hash code for this object instance.  The approach described by
         * Joshua Bloch in "Effective Java" has been used here:
         * <p>
         * <code>http://developer.java.sun.com/developer/Books/effectivejava
         *     /Chapter3.pdf</code>
         *
         * @return A hash code.
         */
        Year.prototype.hashCode = function () {
            var result = 17;
            var c = this.year;
            result = 37 * result + c;
            return result;
        };
        /**
         * Returns an integer indicating the order of this <code>Year</code> object
         * relative to the specified object:
         *
         * negative == before, zero == same, positive == after.
         *
         * @param o1  the object to compare.
         *
         * @return negative == before, zero == same, positive == after.
         */
        Year.prototype.compareTo = function (o1) {
            var result;
            // CASE 1 : Comparing to another Year object
            // -----------------------------------------
            if (o1 instanceof Year) {
                var y = o1;
                result = this.year - y.getYear();
            }
            else if (o1 instanceof AbstractRegularTimePeriod) {
                // more difficult case - evaluate later...
                result = 0;
            }
            else {
                // consider time periods to be ordered after general objects
                result = 1;
            }
            return result;
        };
        /**
         * Returns a string representing the year..
         *
         * @return A string representing the year.
         */
        Year.prototype.toString = function () {
            return this.year.toString();
        };
        /**
         * Parses the string argument as a year.
         * <P>
         * The string format is YYYY.
         *
         * @param s  a string representing the year.
         *
         * @return <code>null</code> if the string is not parseable, the year
         *         otherwise.
         */
        Year.parseYear = function (s) {
            // parse the string...
            var y;
            try {
                y = parseInt(s.trim());
            }
            catch (e) {
                throw Error("Cannot parse string as Year." + s);
            }
            // create the year...
            try {
                return new Year(y);
            }
            catch (e) {
                throw new Error("Year outside valid range.");
            }
        };
        /**
         * The minimum year value.
         *
         * @since 1.0.11
         */
        Year.MINIMUM_YEAR = -9999;
        /**
         * The maximum year value.
         *
         * @since 1.0.11
         */
        Year.MAXIMUM_YEAR = 9999;
        return Year;
    })(AbstractRegularTimePeriod);
    exports.Year = Year;
    var Month = (function (_super) {
        __extends(Month, _super);
        /**
         * Constructs a new month instance.
         *
         * @param month  the month (in the range 1 to 12).
         * @param year  the year.
         */
        function Month(month, year) {
            _super.call(this);
            if ((month < 1) || (month > 12)) {
                throw new Error("Month outside valid range.");
            }
            this.month = month;
            this.year = year;
        }
        /**
         * Returns the year in which the month falls.
         *
         * @return The year in which the month falls (as a Year object).
         */
        Month.prototype.getYear = function () {
            return new Year(this.year);
        };
        /**
         * Returns the year in which the month falls.
         *
         * @return The year in which the month falls (as an int).
         */
        Month.prototype.getYearValue = function () {
            return this.year;
        };
        /**
         * Returns the month.  Note that 1=JAN, 2=FEB, ...
         *
         * @return The month.
         */
        Month.prototype.getMonth = function () {
            return this.month;
        };
        /**
         * Returns the first millisecond of the month.  This will be determined
         * relative to the time zone specified in the constructor, or in the
         * calendar instance passed in the most recent call to the
         * {@link #peg(Calendar)} method.
         *
         * @return The first millisecond of the month.
         *
         * @see #getLastMillisecond()
         */
        Month.prototype.getFirstMillisecond = function () {
            return this.firstMillisecond;
        };
        /**
         * Returns the last millisecond of the month.  This will be
         * determined relative to the time zone specified in the constructor, or
         * in the calendar instance passed in the most recent call to the
         * {@link #peg(Calendar)} method.
         *
         * @return The last millisecond of the month.
         *
         * @see #getFirstMillisecond()
         */
        Month.prototype.getLastMillisecond = function () {
            return this.lastMillisecond;
        };
        /**
         * Returns the month preceding this one.  Note that the returned
         * {@link Month} is "pegged" using the default time-zone, irrespective of
         * the time-zone used to peg of the current month (which is not recorded
         * anywhere).  See the {@link #peg(Calendar)} method.
         *
         * @return The month preceding this one.
         */
        Month.prototype.previous = function () {
            var result;
            if (this.month != MonthConstants.JANUARY) {
                result = new Month(this.month - 1, this.year);
            }
            else {
                if (this.year > 1900) {
                    result = new Month(MonthConstants.DECEMBER, this.year - 1);
                }
                else {
                    result = null;
                }
            }
            return result;
        };
        /**
         * Returns the month following this one.  Note that the returned
         * {@link Month} is "pegged" using the default time-zone, irrespective of
         * the time-zone used to peg of the current month (which is not recorded
         * anywhere).  See the {@link #peg(Calendar)} method.
         *
         * @return The month following this one.
         */
        Month.prototype.next = function () {
            var result;
            if (this.month != MonthConstants.DECEMBER) {
                result = new Month(this.month + 1, this.year);
            }
            else {
                if (this.year < 9999) {
                    result = new Month(MonthConstants.JANUARY, this.year + 1);
                }
                else {
                    result = null;
                }
            }
            return result;
        };
        /**
         * Returns a serial index number for the month.
         *
         * @return The serial index number.
         */
        Month.prototype.getSerialIndex = function () {
            return this.year * 12 + this.month;
        };
        /**
         * Returns a string representing the month (e.g. "January 2002").
         * <P>
         * To do: look at internationalisation.
         *
         * @return A string representing the month.
         */
        Month.prototype.toString = function () {
            return MonthConstants.toMonthName(this.month) + " " + this.year;
        };
        /**
         * Tests the equality of this Month object to an arbitrary object.
         * Returns true if the target is a Month instance representing the same
         * month as this object.  In all other cases, returns false.
         *
         * @param obj  the object (<code>null</code> permitted).
         *
         * @return <code>true</code> if month and year of this and object are the
         *         same.
         */
        Month.prototype.equals = function (obj) {
            if (obj == this) {
                return true;
            }
            if (!(obj instanceof Month)) {
                return false;
            }
            var that = obj;
            if (this.month != that.month) {
                return false;
            }
            if (this.year != that.year) {
                return false;
            }
            return true;
        };
        /**
         * Returns a hash code for this object instance.  The approach described by
         * Joshua Bloch in "Effective Java" has been used here:
         * <p>
         * <code>http://developer.java.sun.com/developer/Books/effectivejava
         * /Chapter3.pdf</code>
         *
         * @return A hash code.
         */
        Month.prototype.hashCode = function () {
            var result = 17;
            result = 37 * result + this.month;
            result = 37 * result + this.year;
            return result;
        };
        /**
         * Returns an integer indicating the order of this Month object relative to
         * the specified
         * object: negative == before, zero == same, positive == after.
         *
         * @param o1  the object to compare.
         *
         * @return negative == before, zero == same, positive == after.
         */
        Month.prototype.compareTo = function (o1) {
            var result;
            // CASE 1 : Comparing to another Month object
            // --------------------------------------------
            if (o1 instanceof Month) {
                var m = o1;
                result = this.year - m.getYearValue();
                if (result == 0) {
                    result = this.month - m.getMonth();
                }
            }
            else if (o1 instanceof AbstractRegularTimePeriod) {
                // more difficult case - evaluate later...
                result = 0;
            }
            else {
                // consider time periods to be ordered after general objects
                result = 1;
            }
            return result;
        };
        /**
         * Parses the string argument as a month.  This method is required to
         * accept the format "YYYY-MM".  It will also accept "MM-YYYY". Anything
         * else, at the moment, is a bonus.
         *
         * @param s  the string to parse (<code>null</code> permitted).
         *
         * @return <code>null</code> if the string is not parseable, the month
         *         otherwise.
         */
        Month.parseMonth = function (s) {
            var result = null;
            if (s == null) {
                return result;
            }
            // trim whitespace from either end of the string
            s = s.trim();
            var i = Month.findSeparator(s);
            var s1;
            var s2;
            var yearIsFirst;
            // if there is no separator, we assume the first four characters
            // are YYYY
            if (i == -1) {
                yearIsFirst = true;
                s1 = s.substring(0, 5);
                s2 = s.substring(5);
            }
            else {
                s1 = s.substring(0, i).trim();
                s2 = s.substring(i + 1, s.length).trim();
                // now it is trickier to determine if the month or year is first
                var y1 = Month.evaluateAsYear(s1);
                if (y1 == null) {
                    yearIsFirst = false;
                }
                else {
                    var y2 = Month.evaluateAsYear(s2);
                    if (y2 == null) {
                        yearIsFirst = true;
                    }
                    else {
                        yearIsFirst = (s1.length > s2.length);
                    }
                }
            }
            var year;
            var month;
            if (yearIsFirst) {
                year = Month.evaluateAsYear(s1);
                month = TimeUtil.stringToMonthCode(s2);
            }
            else {
                year = Month.evaluateAsYear(s2);
                month = TimeUtil.stringToMonthCode(s1);
            }
            if (month == -1) {
                throw Error("Can't evaluate the month.");
            }
            if (year == null) {
                throw new Error("Can't evaluate the year.");
            }
            result = new Month(month, year.getYear());
            console.log("Parse result=" + result);
            return result;
        };
        /**
         * Finds the first occurrence of '-', or if that character is not found,
         * the first occurrence of ',', or the first occurrence of ' ' or '.'
         *
         * @param s  the string to parse.
         *
         * @return The position of the separator character, or <code>-1</code> if
         *     none of the characters were found.
         */
        Month.findSeparator = function (s) {
            var result = s.indexOf('-');
            if (result == -1) {
                result = s.indexOf(',');
            }
            if (result == -1) {
                result = s.indexOf(' ');
            }
            if (result == -1) {
                result = s.indexOf('.');
            }
            return result;
        };
        /**
         * Creates a year from a string, or returns <code>null</code> (format
         * exceptions suppressed).
         *
         * @param s  the string to parse.
         *
         * @return <code>null</code> if the string is not parseable, the year
         *         otherwise.
         */
        Month.evaluateAsYear = function (s) {
            var result = null;
            try {
                result = Year.parseYear(s);
            }
            catch (e) {
            }
            return result;
        };
        return Month;
    })(AbstractRegularTimePeriod);
    exports.Month = Month;
});

//# sourceMappingURL=time.js.map
