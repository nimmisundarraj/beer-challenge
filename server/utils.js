/**
 * General utility functions
 * @author Nimmi
 */

exports.isValidKey = (key) => !!(key && /^[a-zA-Z0-9\-\s]+$/.test(key)) // search text validation