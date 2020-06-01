import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { CSSTransition } from 'react-transition-group'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Sidebar from '../Sidebar'
import Overlay from '../Overlay'
import { fetchCategories } from '../../actions/categories/ActionCreator'
import HeaderCategories from './HeaderCategories'
import MenuItem from './MenuItem'
import {
	HeaderWrapper,
	HeaderContainer,
	MenuWrapper,
	MenuSectionContainer,
} from './Style'

const Header = () => {
	const [activeMenu, setActiveMenu] = useState(false)
	const { data, isError, isFetching, isSuccess } = useSelector(
		state => state.categories
	)
	const dispatch = useDispatch()
	const router = useRouter()

	useEffect(() => {
		dispatch(fetchCategories())
	}, [])

	return (
		<React.Fragment>
			<HeaderWrapper>
				<HeaderContainer>
					<MenuWrapper>
						<MenuSectionContainer>
							<Link href="/" prefetch={false}>
								<div className="todo_remove">
									<MenuItem />
								</div>
							</Link>
							<MenuItem />
						</MenuSectionContainer>
						<MenuSectionContainer>
							<HeaderCategories
								isError={isError}
								isFetching={isFetching}
								isSuccess={isSuccess}
								data={data}
								query={router.query.category}
							/>
						</MenuSectionContainer>
						<MenuSectionContainer>
							<MenuItem />
						</MenuSectionContainer>
					</MenuWrapper>
					<CSSTransition
						in={activeMenu}
						classNames="fade"
						timeout={300}
						unmountOnExit
						mountOnEnter
					>
						<Sidebar closeSidebar={setActiveMenu} />
					</CSSTransition>
				</HeaderContainer>
			</HeaderWrapper>
			<CSSTransition
				in={activeMenu}
				classNames="fade"
				timeout={300}
				unmountOnExit
				mountOnEnter
			>
				<Overlay onClick={() => setActiveMenu(!activeMenu)} />
			</CSSTransition>
		</React.Fragment>
	)
}

export default Header
