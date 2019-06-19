export interface IoUserAttribute {
  name:  string;
  value: number | string;
}

export interface IaUserAttributes extends Array<IoUserAttribute> { }
// interface EnumServiceItems extends Array<EnumServiceItem>{}


export interface IoUserAttributes {
  displayUserName: string;
  lastAccess: string;
  userEmailAddress: string;
  userFullName: string;
  userAccessGroup: string;
  userWorkGroup: string;
}
// export interface UserAttributes {
//   displayUserName: string;
//   lastAccess: string;
//   userEmailAddress: string;
//   userFullName: string;
//   userAccessGroup: string;
//   userWorkGroup: string;
// }
