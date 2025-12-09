import { Timestamp } from 'firebase/firestore';
import { ICompany } from './companyTypes';

export type UserType = {
  id: string;
  superUserId?: string;
  date?: Timestamp | Date;
  clientId?: string;
  displayName?: string;
  email?: string;
  phone?: string;
  uid?: string;
  emailVerified?: boolean;
  loginType?: string;
  role?: string;
  roles?: IUserRoleType[];
  teamIds?: string[];
  referral?: string;
  referralCode?: string;
  uplineIds?: string[];
  autoCountId?: string;
  connectedStripeId?: string;
  userId?: number;
  chatId?: string;
  addOn?: 'whatsappCloud' | 'none' | 'blocked';
  highLevelUserId?: string;
  subAccounts?: string[];
  addOnItems?: string;
  mode?: 'light' | 'dark';
  resellerId?: string;
  highLevelId?: string;
  numberOfSubAccounts?: number;
  accessToIds?: string[];
  timeZone?: string;
  avatarUrl?: string;
  hostname?: string;
  position?: string;
  canAccessDjc?: string;
  fixedAssignedLeads?: boolean;
  giveAccessTo?: string[];
  whatsappInboxPassword?: string;
  customTitle?: string;
  inboxUserAccessLimit?: number;
  teamPosition?: {
    position: string;
    overidingCommisionRate: number;
  };
  newAutoCountId?: boolean;
  photoURL?: string;
  companyIds?: string[];
  companyRoles?: string[];
  currentCompany?: ICompany;
  pagesSubscription?: string[];
  firstTimeUser?: boolean;
  claimedFreeTrial?: boolean;

  // Recent actions for search bar component
  recentActions?: IRecentAction[];
};

export type IRecentAction = {
  title: string;
  path: string;
  group?: string;
  count: number;
};

export type IGlobalBlockedNumber = {
  id?: string;
  number: string;
  name: string;
  dateAdded: Date;
  dateUpdated: Date;
};

export type IUserRoleType = 'casesAdmin';

export type IAddOnItem = 'customLogo' | 'customTitle' | 'reseller';
