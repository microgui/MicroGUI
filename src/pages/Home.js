import './Home.css'

import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../logo.png'
import GitHubIcon from '@mui/icons-material/GitHub'

export default function Home () {
  return (
        <div style={{
          minWidth: '100vw',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
            <div className='homeHeader'>
                <img src={logo} alt='logo' className='homeLogo' />
                <h1 className='homeLogoText'>MicroGUI</h1>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}>
                <div className='navigation'>
                    <Link to='/editor' style={{
                      textDecoration: 'none'
                    }}>
                        <button className='button'>Editor</button>
                    </Link>
                    <Link to='/remote' style={{
                      textDecoration: 'none'
                    }}>
                        <button className='button'>Remote</button>
                    </Link>
                </div>
                Press the 'Editor' button if you would like to create your own GUI <br></br>
                or the 'Remote' button if you would like to connect to a display that is already running MicroGUI
            </div>

            <footer className='footer'>
				<p>© MicroGUI 2022 |&nbsp;</p>
				<a
					href='https://github.com/microgui/MicroGUI'
					target='_blank'
					rel='noreferrer'
					style={{
					  color: 'inherit',
					  display: 'flex',
					  alignItems: 'center'
					}}
				>
					GitHub
					<GitHubIcon xs='md' sx={{ paddingLeft: '2px' }} />
				</a>
			</footer>

        </div>
  )
}
