import { $ } from '@builder.io/qwik';
import { App } from './models/app';
import { Directory } from './models/directory';
import ViewContact from './components/view-contact/view-contact';
import ViewProjects from './components/view-projects/view-projects';
import ViewSettings from './components/view-settings/view-settings';
import ViewAbout from './components/view-about/view-about';
import { PersonalNotification } from './models/personal-notification';
import ViewDatingsystem from './components/view-datingsystem/view-datingsystem';

// apps intalled on the system and its respective states

export const disk: Directory<Directory<{app: App; state: {} | PersonalNotification}>> = {
  'desktop': {
    'Projects': {
      app: {
        name: 'Projects',
        icon: {
          name: 'folder',
        },
        content: $(() => <ViewProjects />),
      },
      state: {},
    },
    'About Me': {
      app: {
        name: 'About Me',
        icon: {
          name: 'document',
        },
        content: $(() => <ViewAbout />),
      },
      state: {},
    },
    'Contact Me': {
      app: {
        icon: {
          name: 'mail',
        },
        name: 'Contact Me',
        content: $(() => <ViewContact />),
      },
      state: {
        title: '',
        contact: '',
        message: '',    
      },
    },
    'Settings': {
      app: {
        icon: {
          name: 'settings',
        },
        name: 'Settings',
        content: $(() => <ViewSettings />),
      },
      state: {},
    },
  },
  'projects': {
    'dating-system': {
      app: {
        icon: {
          name: 'document',
        },
        name: 'dating-system',
        content: $(() => <ViewDatingsystem />),
      },
      state: {},
    },    
  }
};
