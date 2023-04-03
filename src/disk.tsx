import { $ } from '@builder.io/qwik';
import { App } from './models/app';
import { Directory } from './models/directory';
import ViewIntroduction from './components/view-introduction/view-introduction';
import ViewContact from './components/view-contact/view-contact';
import ViewProjects from './components/view-projects/view-projects';
import ViewSettings from './components/view-settings/view-settings';
import ViewAbout from './components/view-about/view-about';

// apps intalled on the system and its respective states

export const disk: Directory<Directory<{app: App; state: unknown}>> = {
  'desktop': {
    'Introduction': {
      app: {
        name: 'Introduction',
        icon: {
          name: 'document',
        },
        content: $(() => <ViewIntroduction />),
      },
      state: {},
    },
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
          name: 'profile',
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
  }
};
