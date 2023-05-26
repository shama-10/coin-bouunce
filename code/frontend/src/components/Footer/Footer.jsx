import styles from './Footer.module.css'
function Footer(){
    return(
        <p className={styles.footer}>&copy;{(new Date().getFullYear())}Footer</p>
    );
}
export default Footer;