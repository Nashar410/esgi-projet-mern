import * as React from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LocalMall from '@material-ui/icons/LocalMall';
import DoneIcon from '@material-ui/icons/Done';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paperDone: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    para: {
        textAlign: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    done: {
        backgroundColor: theme.palette.success.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Register() {


    //
    const [fname, setFname] = React.useState('');
    const [lname, setLname] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [kbis, setKbis] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorUsername, setErrorUsername] = React.useState('');
    const [errorEmail, setErrorEmail] = React.useState('');
    const [sendForm, setSendForm] = React.useState(false);
    let elementTextFieldUsername;
    let elementTextFieldEmail;
    let elementConfirmSend;
    let errorMessage;

    const classes = useStyles();

    const handleChange = event => {

        let nameAttribut = event.target.name
        let valueInput = event.target.value

        if(nameAttribut === 'firstName') {
            setFname(valueInput)
            event.target.setAttribute('error', '')
        }
        else if(nameAttribut === 'lastName') {
            setLname(valueInput)
        }
        else if(nameAttribut === 'username') {
            setUsername(valueInput)
            setErrorUsername('')
        }
        else if(nameAttribut === 'company') {
            setCompany(valueInput)
        }
        else if(nameAttribut === 'kbis') {
            setKbis(valueInput)
        }
        else if(nameAttribut === 'email') {
            setEmail(valueInput)
            setErrorEmail('')
        }
        else if(nameAttribut === 'password') {
            setPassword(valueInput)
        }

    }

    const handleSubmit = (event) => {

        let isValid = 0;

        if(fname !== ''){
            isValid += 1;
        }

        if(lname !== ''){
            isValid += 1;
        }

        if(username !== ''){
            isValid += 1;
        }

        if(company !== ''){
            isValid += 1;
        }

        if(kbis !== ''){
            isValid += 1;
        }

        if(email !== ''){
            isValid += 1;
        }

        if(password !== ''){
            isValid += 1;
        }

        if(isValid === 7){
            return createUser(event);
        }else {
            console.log('Veuillez saisir tous les champs')
        }

        event.preventDefault();
    }

    const createUser = (event) => {

        fetch("http://localhost:3000/api/auth/signup/", {
            method: 'POST',
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: fname,
                lastName: lname,
                username: username,
                kbis: kbis,
                email: email,
                roles: ["admin"],
                devise: null,
                contact: null,
                company: company,
                confirmed: false,
                password: password,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
        })
        .then((response) => response.json())
        .then((responseData) => {
            if(responseData.message === 'User was registered successfully!'){
                setSendForm(true)
                setTimeout(function(){
                    window.location.replace(window.location.origin + '/#/login')
                }, 5000);
            }else{
                errorMessage = responseData.message;
                if(errorMessage === 'Failed! Username is already in use!'){
                    setErrorUsername('Le Username est déjà utilisé')
                }else {
                    setErrorUsername('')
                }

                if(errorMessage === 'Failed! Email is already in use!'){
                    setErrorEmail('L\'email saisi est déjà utilisé')
                }else {
                    setErrorEmail('')
                }
            }
        })

        event.preventDefault();
    }

    if(errorUsername !== ''){
        elementTextFieldUsername = <TextField
            error
            onChange={(event) => handleChange(event)}
            variant="outlined"
            required
            fullWidth
            helperText={errorUsername}
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            required
        />
    }else{
        elementTextFieldUsername = <TextField
            onChange={(event) => handleChange(event)}
            variant="outlined"
            required
            fullWidth
            helperText={errorUsername}
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            required
        />
    }

    if(errorEmail !== ''){
        elementTextFieldEmail = <TextField
            error
            onChange={(event) => handleChange(event)}
            variant="outlined"
            required
            fullWidth
            id="email"
            helperText={errorEmail}
            label="Adresse e-mail"
            name="email"
            autoComplete="email"
            required
        />
    }else{
        elementTextFieldEmail = <TextField
            onChange={(event) => handleChange(event)}
            variant="outlined"
            required
            fullWidth
            id="email"
            helperText={errorEmail}
            label="Adresse e-mail"
            name="email"
            autoComplete="email"
            required
        />
    }

    if(sendForm){
        elementConfirmSend = <div className={classes.paperDone}>
            <Avatar className={classes.done}>
                <DoneIcon/>
            </Avatar>
            <p className={classes.para}>
                Votre inscription a bien été prise en compte, félicitations !

                Vous allez être redirigé sur la page de connexion dans quelques secondes.
            </p>
        </div>
    }else{
        elementConfirmSend;
    }

    return (
        <React.Fragment>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LocalMall/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Créer mon compte marchand
                    </Typography>
                    {elementConfirmSend}
                    <form className={classes.form} onSubmit={(event) => handleSubmit(event)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(event) => handleChange(event)}
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Prénom"
                                    autoFocus
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onChange={(event) => handleChange(event)}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Nom"
                                    name="lastName"
                                    autoComplete="lname"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {elementTextFieldUsername}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={(event) => handleChange(event)}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="company"
                                    label="Nom de la société"
                                    name="company"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={(event) => handleChange(event)}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="kbis"
                                    label="KBIS de la société"
                                    name="kbis"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {elementTextFieldEmail}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={(event) => handleChange(event)}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Mot de passe"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    required
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Créer mon compte
                        </Button>
                    </form>
                </div>
            </Container>
        </React.Fragment>
    )
}
