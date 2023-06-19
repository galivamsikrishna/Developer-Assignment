import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

// Import the required fields for Account and related objects
import ACCOUNT_FIELD from '@salesforce/schema/Account';
import CONTACT_FIELD from '@salesforce/schema/Contact';

// Import the necessary fields for the tables
const CHILD_ACCOUNT_FIELDS = [
    'Name',
    'Status',
    'AnnualRevenue',
    'CreatedDate'
];
const CONTACT_FIELDS = [
    'Name',
    'DoNotCall',
    'Email',
    'CreatedDate'
];

export default class AccountDetailPage extends LightningElement {
    @api recordId; // Id of the current Account record

    // Store the related child Account records and contacts
    childAccounts = [];
    contacts = [];

    // Define the columns for the child Account table
    childAccountColumns = [
        { label: 'Name', fieldName: 'Name', type: 'text' },
        { label: 'Status', fieldName: 'Status', type: 'text' },
        { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency' },
        { label: 'Created Date', fieldName: 'CreatedDate', type: 'date' }
    ];

    // Define the columns for the contact table
    contactColumns = [
        { label: 'Name', fieldName: 'Name', type: 'text' },
        { label: 'Do Not Call', fieldName: 'DoNotCall', type: 'boolean' },
        { label: 'Email', fieldName: 'Email', type: 'email' },
        { label: 'Created Date', fieldName: 'CreatedDate', type: 'date' }
    ];

    @wire(getRecord, { recordId: '$recordId', fields: CHILD_ACCOUNT_FIELDS })
    loadChildAccounts({ error, data }) {
        if (data) {
            this.childAccounts = data.fields.ChildAccounts.value.records;
        } else if (error) {
            // Handle error
        }
    }

    @wire(getRecord, { recordId: '$recordId', fields: CONTACT_FIELDS })
    loadContacts({ error, data }) {
        if (data) {
            this.contacts = data.fields.Contacts.value.records;
        } else if (error) {
            // Handle error
        }
    }
}

