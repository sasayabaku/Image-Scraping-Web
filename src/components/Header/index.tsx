import React from 'react';

import AppsIcon from '@mui/icons-material/Apps';

import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Header = () => {
  return (
    <div className="flex shadow-sm bg-gray-50 p-6 justify-between">
      <div className="flex space-x-3">
      </div>
      <div className="flex space-x-4 text-gray-400 mr-3">
        <AppsIcon />
        <ExitToAppIcon />
      </div>
    </div>
  );
};

export default Header;
