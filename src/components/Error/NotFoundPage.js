import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';


export async function fuzzyPathErrors(pathname, expectedPathname){
    const slicedPath = pathname.split('')
    const slicedExpectedPath = expectedPathname.split('')
    const maxTotalErrors = 3
    let totalErrors = 0
    let missingLetters = 0
    let expected = {}
    // sets up the expected object, used to avoid nested for loop
    for await (let char of slicedExpectedPath) {
        if (!expected[char]) {
            expected[char] = 1;
        } else {
            expected[char] = expected[char] + 1;
        }
   }

   // counts complete errors and sets up the counting of missing letters
   for await (let letter of slicedPath) {
     if(expected[letter]) {
         expected[letter] = expected[letter] - 1;
     } else {
         totalErrors += 1;
     }
   }
    
  // counts any missing letters from actual path
  for  (let key in expected) {
      missingLetters += expected[key]
  }

  // fuzzy check to see if errors are in-bounds 
  if(missingLetters < slicedExpectedPath.length / 2 && totalErrors < maxTotalErrors) {
      return true
  } else {
      return false
  }
}


export async function getBackToHomePath(pathname) {
        const expectedPath = 'explorer'
        if(pathname.split('/')[1].indexOf(expectedPath) >= 0) {
            return '/explorer';
        }
        
        const fuzzyFoundPath = await fuzzyPathErrors(pathname.split('/')[1], expectedPath)
        if(fuzzyFoundPath){
            return '/explorer';
        } else {
            return '/'
        }
    }
 
class NotFoundPage extends Component {
    
    render() {
        return (
            <article className="container" id='not-found-page'>
                <Row id="not-found-container" className='mr-5 p-5'>
                    <Col xs={12} md={4}>
                        <img className='not-found-image' src="img/404-img.svg" alt="Page not found" id="oops-image"/>
                    </Col>
                    <Col xs={12} md={8} className='not-found-text'>
                        <p className="not-found-regular">Sorry. We couldn't find the page you're looking for.</p>
                        <p className="not-found-small">
                            If you're still having problems, please contact <a href='mailto:admin@kpmp.org'>admin@kpmp.org</a>
                        </p>
                        <p className="oops-button-container">
                        <Button color='primary'
                            className="btn btn-primary"
                                onClick={async () =>(window.location.href = await getBackToHomePath(window.location.pathname))}
                        >
                            Back to Home
                        </Button>
                        </p>
                    </Col>
                </Row>
          </article>
        );
    }
}

export default NotFoundPage;
