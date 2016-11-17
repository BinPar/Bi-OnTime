
if (Meteor.isClient) {

    const DEFAULT_LANG = "en";

    var getUserLanguage = function () {
        let lang = localStorage.getItem("language");

        if (!lang || lang == undefined) {
            lang = DEFAULT_LANG;
            localStorage.setItem("language", DEFAULT_LANG);
        }

        return lang;
    };

    Meteor.startup(() => {
        Session.set("showLoadingIndicator", true);

        TAPi18n.setLanguage(getUserLanguage())
            .done(() => {
                Session.set("showLoadingIndicator", false);
            })
            .fail((err) => {
                console.log(err);
            });
    });
}