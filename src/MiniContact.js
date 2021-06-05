const MiniContact = (props) => {
    let contactImage = props.contactImage
    let email = props.email
    let displayName = props.displayName

    return ( 
        <div contact-display-name={displayName} contact-email={email} className="miniContact" >

            <img src={contactImage} alt={email} className="contactPicture" />
        </div>
     );
}
 
export default MiniContact;