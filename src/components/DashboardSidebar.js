import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  Truck as TruckIcon,
  BarChart as BarChartIcon,
  FileText as FileTextIcon,
  Database as DatabaseIcon,
  Bookmark as BookmarkIcon,
  User as UserIcon,
  // User as UserIcon
} from 'react-feather';
import NavItem from './NavItem';

const user = {
  avatar: '/static/images/avatars/logo.png',
  jobTitle: 'GSMS',
  name: 'PT Greentech Globalindo'
};

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/materials',
    icon: DatabaseIcon,
    title: 'Material'
  },
  {
    href: '/app/material-change-history',
    icon: BookmarkIcon,
    title: 'Material Change History'
  },
  {
    href: '/app/packing-list',
    icon: FileTextIcon,
    title: 'Packing List'
  },
  {
    href: '/app/packing-list-change-history',
    icon: BookmarkIcon,
    title: 'Packing List Change History'
  },
  {
    href: '/app/locations',
    icon: TruckIcon,
    title: 'Transfer Location'
  },
  {
    href: '/app/users',
    icon: UserIcon,
    title: 'Users'
  }
  // {
  //   href: '/app/settings',
  //   icon: SettingsIcon,
  //   title: 'Settings'
  // },
  // {
  //   href: '/login',
  //   icon: LockIcon,
  //   title: 'Login'
  // },
  // {
  //   href: '/register',
  //   icon: UserPlusIcon,
  //   title: 'Register'
  // },
  // {
  //   href: '/404',
  //   icon: AlertCircleIcon,
  //   title: 'Error'
  // }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          src={user.avatar}
          style={{
            cursor: 'pointer',
            width: 100,
            height: 100
          }}
        />
        <Typography color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box style={{ padding: 4 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box style={{ flexGrow: 2 }} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            style: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            style: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)',
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default DashboardSidebar;
