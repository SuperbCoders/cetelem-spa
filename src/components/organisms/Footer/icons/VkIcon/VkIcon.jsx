import React from 'react';
import cls from 'classnames';

import styles from './VkIcon.module.scss';

function VkIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 14"
      xmlns="http://www.w3.org/2000/svg"
      className={cls(styles.VkIcon, className)}
    >
      <path d="M13.0983 13.1915C13.0983 13.1915 13.5026 13.1474 13.7097 12.9291C13.8992 12.7291 13.8926 12.3516 13.8926 12.3516C13.8926 12.3516 13.8674 10.589 14.7012 10.3287C15.5229 10.0728 16.5779 12.0333 17.6976 12.7872C18.5434 13.3571 19.1854 13.2324 19.1854 13.2324L22.1774 13.1915C22.1774 13.1915 23.7419 13.0969 23.0002 11.8892C22.9389 11.7902 22.5675 10.9955 20.7762 9.36302C18.8995 7.65417 19.1514 7.93056 21.4105 4.97422C22.7866 3.17396 23.3366 2.07488 23.1646 1.60492C23.0013 1.15539 21.989 1.27477 21.989 1.27477L18.6212 1.2952C18.6212 1.2952 18.3714 1.26186 18.1862 1.37048C18.0055 1.47695 17.8882 1.72537 17.8882 1.72537C17.8882 1.72537 17.3558 3.11804 16.6447 4.30316C15.1449 6.80244 14.5456 6.93471 14.3002 6.77985C13.7294 6.41744 13.8718 5.32588 13.8718 4.5505C13.8718 2.12758 14.2465 1.11775 13.1433 0.856427C12.7773 0.769318 12.5078 0.712321 11.5711 0.702642C10.3692 0.690812 9.35253 0.706944 8.77625 0.983327C8.3928 1.16722 8.09699 1.57804 8.27776 1.60169C8.50016 1.63073 9.00413 1.73505 9.27146 2.09209C9.61657 2.55344 9.60451 3.588 9.60451 3.588C9.60451 3.588 9.80282 6.44002 9.14108 6.79383C8.68751 7.03688 8.06522 6.54111 6.72751 4.27304C6.04277 3.11159 5.52565 1.82753 5.52565 1.82753C5.52565 1.82753 5.42595 1.58771 5.24737 1.45866C5.03154 1.30273 4.73026 1.25433 4.73026 1.25433L1.53005 1.27477C1.53005 1.27477 1.04909 1.28767 0.872703 1.49308C0.716034 1.67482 0.860652 2.0523 0.860652 2.0523C0.860652 2.0523 3.36625 7.80688 6.20382 10.7073C8.80583 13.3657 11.7595 13.1915 11.7595 13.1915H13.0983Z" />
    </svg>
  );
}

export default VkIcon;