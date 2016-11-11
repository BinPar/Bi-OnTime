/**
 * Created by raquel on 21/12/15.
 */

BinPar = {};
BinPar.NPM = BinPar.NPM || {};
BinPar.Functions = {};

Meteor.startup(function () {
	if(Meteor.isServer) {
		BinPar.NPM.fs = Npm.require('fs');
		BinPar.NPM.path = Npm.require('path');
		//BinPar.NPM.exec = Npm.require('child_process').exec;
		BinPar.uploadsFolder = BinPar.NPM.path.join(process.cwd(), "/../../../../../../uploads/users");
	}
});