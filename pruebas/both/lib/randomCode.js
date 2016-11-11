generateRandomCode = function () {
	return (Math.random() * new Date().getTime()).toString(36).replace( /\./g , '');
};