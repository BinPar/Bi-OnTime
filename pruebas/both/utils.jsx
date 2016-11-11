
class Utils {

    constructor() {
        this.lastTitle = "";
    }

    initCap(s) {
        return s.toLowerCase().replace(/(?:^|\s)[a-z]/g, (m) => {
            return m.toUpperCase();
        });
    }

    prettyArray(a, max) {
        if (a) {
            if (!max || max < 1) {
                max = 2;
            }

            if (a.length == 0) {
                return "----";
            }

            let i = 0;
            let str = "";

            while (i < a.length - 1 && i < max - 1) {
                str += `${a[i]}, `;
                i++;
            }
            str += a[i];

            if (a.length > max) {
                str += ", ...";
            }

            return str;
        }
    }

    formatDate(date) {
        if (date) {
            return `${date.getFullYear()}/${this.pad(date.getMonth() + 1)}/${this.pad(date.getDate())}`;
        } else {
            return "----";
        }
    }

    formatDateTime(date, showSeconds) {
        if (date) {
            return `${date.getFullYear()}/${this.pad(date.getMonth() + 1)}/${this.pad(date.getDate())} ${date.getHours()}:${this.pad(date.getMinutes())}${showSeconds ? `:${this.pad(date.getSeconds())}` : ""}`;
        } else {
            return "----";
        }
    }

    pad(number) {
        if (number && number < 10) {
            return `0${number}`;
        }
        return number;
    }

    setTitle(title) {
        this.lastTitle = title;
        DocHead.setTitle(`${__(title)} - Aage Hempel Back Office`);
    }

    refreshTitle() {
        DocHead.setTitle(`${__(this.lastTitle)} - Aage Hempel Back Office`);
    }
}

export default UtilsInstance = new Utils();
