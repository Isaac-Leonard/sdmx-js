/// <reference path="../moment.d.ts" />
module xml {
    var moment = require('moment');
    export class DateTime {
        public static DF: String = "yyyy-MM-dd'T'HH:mm:ssXXX";
        public static DF2: String = "yyyy-MM-dd'T'HH:mm:ss";
        private baseString: String = null;
        private date: Date = null;

        constructor(d: Date) {
            this.date = d;
        }

        public getDate(): Date {
            return this.date;
        }

        public static fromString(s: String): DateTime {
            if (s == null || s == "") {
                return null;
            }
            var m = new moment(s, [DateTime.DF, DateTime.DF2]);
            var dt:DateTime = new DateTime(m.toDate());
            dt.setBaseString(s);
            return dt;
        }
        public toString(): String {
            if (this.baseString != null) return this.baseString;
            return new moment(this.date).format(DateTime.DF);
        }
        public static now(): DateTime {
            return new DateTime(new moment().toDate());
        }
        public setBaseString(s: String) {
            this.baseString = s;
        }
        public getBaseString() {
            return this.baseString;
        }
    }
}
