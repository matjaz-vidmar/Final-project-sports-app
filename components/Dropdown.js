// // Dropdown.js file

// import { useSelect } from 'downshift';
// import DropdownItem from 'path-to-dropdown-item';
// import PropTypes from 'prop-types';
// import { useCallback } from 'react';
// import { Sport } from '../database/sports';
// import styles from './Dropdown.module.css';

// const sportToString = (sport) => sport?.value ?? '';
// const placeholderLabel = 'Choose your sport';

// const Dropdown = ({
//   id,
//   sports,
//   className,
//   onStateChange,
//   placeholderLabel,
//   defaultSelectedItem,
//   ...rest
// }) => {
//   const {
//     isOpen,
//     selectedItem,
//     highlightedIndex,
//     getMenuProps,
//     getItemProps,
//     getToggleButtonProps,
//   } = useSelect({
//     id,
//     sportToString,
//     sports,
//     onStateChange,
//     defaultSelectedItem,
//   });

//   const renderDropdownSports = useCallback(
//     () =>
//       sports.map((sport, id) => (
//         <DropdownItem
//           sport={sport}
//           key={`dropdown-item-${id}`}
//           selected={selectedSport === sport}
//           highlighted={highlightedId === id}
//           {...getSportProps({ sport, id })}
//         />
//       )),
//     [highlightedIndex, getSportProps, selectedSport, sports],
//   );

//   return (
//     <div {...rest} className={classNames(styles.container, className)}>
//       <button
//         className={classNames(styles.trigger, { [styles.isOpen]: isOpen })}
//         {...getToggleButtonProps()}
//       >
//         {selectedItem?.label ?? placeholderLabel}
//       </button>
//       <ul className={styles.menu} {...getMenuProps()}>
//         {isOpen && renderDropdownItems()}
//       </ul>
//     </div>
//   );
// };

// Dropdown.propTypes = {
//   className: PropTypes.string,
//   onStateChange: PropTypes.func,
//   id: PropTypes.string.isRequired,
//   sports: PropTypes.array.isRequired,
//   defaultSelectedSport: PropTypes.any,
//   placeholderLabel: PropTypes.string,
// };

// export default Dropdown;
