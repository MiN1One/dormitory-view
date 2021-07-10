import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import './index.scss';

const Profile = () => {
  const { user } = useSelector(state => state.user);
  const history = useHistory();

  if (!user) 
    history.replace('/auth/login');

  return (
    <main className="profile">
      
    </main>
  );
};

// (function() {
//   'use strict';

//   var section = document.querySelectorAll(".section");
//   var sections = {};
//   var i = 0;

//   Array.prototype.forEach.call(section, function(e) {
//     sections[e.id] = e.offsetTop;
//   });

//   window.onscroll = function() {
//     var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

//     for (i in sections) {
//       if (sections[i] <= scrollPosition) {
//         document.querySelector('.active').setAttribute('class', ' ');
//         document.querySelector('a[href*=' + i + ']').setAttribute('class', 'active');
//       }
//     }
//   };
// })();


export default React.memo(Profile);
