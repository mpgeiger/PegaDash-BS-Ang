export interface IoUserAttribute {
  name:  string;
  value: number | string;
}

export interface IaUserAttributes {
  IoUserAttribute: IoUserAttribute[];
}

export interface IoUserAttributes {
  displayUserName: string;
  lastAccess: string;
  userEmailAddress: string;
  userFullName: string;
  userAccessGroup: string;
  userWorkGroup: string;
}
