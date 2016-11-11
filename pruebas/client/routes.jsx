import React from 'react';
import {mount} from 'react-mounter';
import MainLayout from './layouts/mainLayout';
import Index from './pages/index';

FlowRouter.route('/', {
	action() {
		mount(MainLayout, {
			content: <Index />
		});
	}
});

FlowRouter.route('/logout', {
	action() {
		Meteor.logout((error) => {
			FlowRouter.go("/login");
		});
	}
});
