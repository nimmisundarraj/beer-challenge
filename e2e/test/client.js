/**
 * Test for beer home page.
 * BeerShop
 * @author Nimmi
 */

describe('Beer shop UI test cases - 01', () => {

  describe('Login', () => {
    it('Ensure the url is up', () => {
      expect(browser.getCurrentUrl()).toMatch('/localhost');
    })
  })

  describe('UI fields availability', () => {

    describe('Header section', () => {
      it('Ensure section header is present', () => {
        expect($('#header h2').getAttribute('innerText')).toMatch('BEER SHOP');
      })
    })

    describe('Default beer section', () => {
      it('Ensure default beer container is present', () => {
        expect($('.default-beer').isPresent()).toBe(true);
      })

      it('Ensure default beer container consist of header', () => {
        expect($('.default-beer h5').getAttribute('innerText')).toBeTruthy();
      })

      it('Ensure default beer container consist of image', () => {
        expect($('.beer-container img').isPresent()).toBeTruthy();
      })

      it('Ensure default beer container consist of description', () => {
        expect($('.beer-data p').isPresent()).toBeTruthy();
      })

      it('Ensure default beer container consist of button groups', () => {
        $$('.button-group button').count().then((count) => {
          expect(count).toBe(2);
        });
      })
    })

    describe('Search section', () => {
      it('Ensure search section is found', () => {
        expect($('.beer-search nav').isPresent()).toBeTruthy();
        expect($('.beer-search .search-section').isPresent()).toBeTruthy();
      })

      it('Ensure on load please search section is loaded', () => {
        expect($('.no-data h3').getAttribute('innerText')).toContain('Please do a search');
      })

      it('Ensure on load please search button is disabled', () => {
        expect($('.btn-outline-success').isEnabled()).toBe(false)
      })
    })

    describe('Default section button functionality', () => {
      it('Check on clicking the change beer button, changing the default beer', () => {
        $('.default-beer h5').getAttribute('innerText').then((oldName) => {
          $('.default-beer p').getAttribute('innerText').then((oldDesc) => {
            $$('.button-group button').get(0).click().then(() => {
              expect($('.default-beer h5').getAttribute('innerText')).not.toMatch(oldName);
              expect($('.default-beer p').getAttribute('innerText')).not.toMatch(oldDesc);
            })
          })
        })
      })

      it('Check on clicking the random non alcoholic beer button, changing the default beer', () => {
        $('.default-beer h5').getAttribute('innerText').then((oldName) => {
          $('.default-beer p').getAttribute('innerText').then((oldDesc) => {
            $$('.button-group button').get(0).click().then(() => {
              expect($('.default-beer h5').getAttribute('innerText')).not.toMatch(oldName);
              expect($('.default-beer p').getAttribute('innerText')).not.toMatch(oldDesc);
            })
          })
        })
      })
    })

    describe('Default search functionality', () => {
      it('Ensure the error message is shown for the invalid search text', () => {
        $$('.navbar input').get(0).sendKeys('error!@#$').then(() => {
          expect($('.help-block').isPresent()).toBeTruthy()
        })
      })

      it('Ensure the error message is not shown for the valid search text', () => {
        $$('.navbar input').get(0).clear().sendKeys('b').then(() => {
          expect($('.help-block').isPresent()).not.toBeTruthy()
        })
      })

      it('Ensure the valid search results are shown on clicking the search button by name', () => {
        $('.btn-outline-success').click().then(() => {
          $$('.search-container h6').count().then(count => {
            while (count) {
              $$('.search-container h6').get(--count).getAttribute('innerText').then(text => {
                expect(text.toLowerCase()).toContain('b')
              })
            }
          })
        })
      })

      it('Ensure the valid search results are shown on clicking the search button by description', () => {  // api not working properly
        $$('.navbar input').get(0).clear().sendKeys('batch').then(() => {
          $('.Description').click().then(() => {
            $('.btn-outline-success').click().then(() => {
              $$('.search-container h6').count().then(count => {
                while (count) {
                  $$('.search-container p').get(--count).getAttribute('innerText').then(text => {
                    expect(text.toLowerCase()).toContain('batch')
                  })
                }
              })
            })
          })
        })
      })

      it('Ensure the no results are shown on clicking the search button by wrong name', () => {
        $$('.navbar input').get(0).clear().sendKeys('dkjvdjvdf').then(() => {
          $('.Name').click().then(() => {
            $('.btn-outline-success').click().then(() => {
              expect($('.no-data h3').getAttribute('innerText')).toContain('No Results Found')
            })
          })
        })
      })
    })
  })
})