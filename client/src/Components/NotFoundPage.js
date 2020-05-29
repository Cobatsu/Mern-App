import React from 'react';
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import './notFound.css'

const NotFoundPage = ({path})=>{

    return <React.Fragment>

    <div id="notfound">
		<div class="notfound">
			<div class="notfound-404">
				<h1>Oops!</h1>
			</div>
			<h2>404 - Page not found</h2>
			<p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
			<Link to={'/'+path}>GO TO HOMEPAGE</Link>
		</div>
	</div>
    
  </React.Fragment> 

}

export default NotFoundPage;