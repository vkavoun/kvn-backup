import { ReactNode } from 'react';
import { UAParser } from 'ua-parser-js';

export interface NavNode {
  title: string;
  href: string;
  navHeader: boolean;
}

export interface ComponentProps {
  children?: ReactNode;
}

export interface UserAgentInterface {
  getObjectResult(): object;
}

export type UserAgentType = UserAgentInterface;

export class UserAgent extends UAParser implements UserAgentInterface {
  constructor(uastring?: string, extensions?: any) {
    super(uastring, extensions);
  }
}

export interface PageProps extends ComponentProps {
  userAgent?: string | Record<string, object>;
  isServer?: boolean;
}
export interface LayoutProps extends PageProps {
  payload?: UserAgent;
}
