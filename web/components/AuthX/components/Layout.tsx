const Layout = (props: any) => {
    return (
        <>
            <h1>Custom Layout Heading</h1>
            {props.children}
            <h1>Custom Layout Footer</h1>
        </>
    )
}

export default Layout