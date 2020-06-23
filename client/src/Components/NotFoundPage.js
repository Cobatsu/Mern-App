import React from 'react';
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import './notFound.css'
import {useHistory} from 'react-router-dom'

const NotFoundPage = ()=>{

	const history = useHistory();

	const goBackToPage = (e)=>{ 
		
		e.preventDefault();

		history.goBack();
	}

    return <React.Fragment>

    <div id="notfound">
		<div class="notfound">
			<div class="notfound-404">
				<h1>Oops!</h1>
			</div>
			<h2>404 - Page not found</h2>
			<p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
			<button onClick={goBackToPage}>GO BACK</button>
		</div>
	</div>
    
  </React.Fragment> 

}

export default NotFoundPage;