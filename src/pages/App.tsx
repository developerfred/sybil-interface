import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
import Header from '../components/Header'
import Polling from '../components/Header/Polling'
import URLWarning from '../components/Header/URLWarning'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import Overview from './Governance'
import { RedirectWithUpdatedGovernance } from './Governance/redirect'
import SideMenu from '../components/Menu/SideMenu'
import TwitterAccountQueryParamReader from '../state/social/TwitterAccountQueryParamReader'

const SiteWrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 1.5em;
  overflow: auto;
`

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 64px;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 16px;
    padding-top: 2rem;
  `};

  z-index: 1;
`

const Marginer = styled.div`
  margin-top: 5rem;
`

export default function App() {
  return (
    <Suspense fallback={null}>
      <Route component={GoogleAnalyticsReporter} />
      <Route component={DarkModeQueryParamReader} />
      <Route component={TwitterAccountQueryParamReader} />
      <SiteWrapper>
        <SideMenu />
        <AppWrapper>
          <URLWarning />
          {/* <HeaderWrapper>
            <Header />
          </HeaderWrapper> */}
          <BodyWrapper>
            <Popups />
            <Polling />
            <Web3ReactManager>
              <Switch>
                <Route exact strict path="/:protocolId" component={Overview} />
                <Route exact strict path="/" component={RedirectWithUpdatedGovernance} />
              </Switch>
            </Web3ReactManager>
            <Marginer />
          </BodyWrapper>
        </AppWrapper>
      </SiteWrapper>
    </Suspense>
  )
}
