// // DropdownItem.js file

// import classNames from 'classnames';
// import PropTypes from 'prop-types';
// import { forwardRef } from 'react';
// import styles from './DropdownItem.module.css';

// const DropdownItem = forwardRef(
//   ({ sport, highlighted, selected, className, ...rest }, ref) => {
//     const sportClasses = classNames(
//       styles.sport,
//       {
//         [styles.highlighted]: highlighted,
//         [styles.selected]: selected,
//       },
//       className,
//     );

//     return (
//       <li {...rest} ref={ref} className={sportClasses}>
//         {sport.label}
//       </li>
//     );
//   },
// );

// DropdownItem.propTypes = {
//   selected: PropTypes.bool,
//   highlighted: PropTypes.bool,
//   className: PropTypes.string,
//   item: PropTypes.object.isRequired,
// };

// DropdownItem.defaultProps = {
//   selected: false,
//   highlighted: false,
// };

// export default DropdownItem;
