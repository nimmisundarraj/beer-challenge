/**
 * Test for beer utility functions.
 * BeerShop
 * @author Nimmi
 */

let utils = require('../../server/utils')

describe('Check utils functions', () => {

  describe('Utility isValid key function', () => {
    it('Is valid function a valid param should return true', () => {
      expect(utils.isValidKey('nim123- re')).toBeTruthy()
    })
    it('Is valid function a valid hyphens and spaces param should return true', () => {
      expect(utils.isValidKey('nim123- re')).toBeTruthy()
    })
    it('Is valid function without param should return false', () => {
      expect(utils.isValidKey()).not.toBeTruthy()
    })
    it('Is valid function a empty param should return false', () => {
      expect(utils.isValidKey('')).not.toBeTruthy()
    })
    it('Is valid function a in valid param should return false', () => {
      expect(utils.isValidKey('nim123!!@#@#')).not.toBeTruthy()
    })
  })

})
