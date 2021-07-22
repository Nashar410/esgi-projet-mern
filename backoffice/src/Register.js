import * as React from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LocalMall from '@material-ui/icons/LocalMall';
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
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
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
    const [company, setCompany] = React.useState('');
    const [kbis, setKbis] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    const classes = useStyles();

    const handleChange = event => {

        let nameAttribut = event.target.name
        let valueInput = event.target.value
        
        if(nameAttribut == 'firstName') {
            setFname(valueInput)
        }
        else if(nameAttribut == 'lastName') {
            setLname(valueInput)
        }
        else if(nameAttribut == 'company') {
            setCompany(valueInput)
        }
        else if(nameAttribut == 'kbis') {
            setKbis(valueInput)
        }
        else if(nameAttribut == 'email') {
            setEmail(valueInput)
        }
        else if(nameAttribut == 'password') {
            setPassword(valueInput)
        }

    }

    const handleSubmit = (event) => {

        if(fname != '', lname != '', company != '', kbis != '', email != '', password != ''){

            console.log(JSON.stringify({
                firstName: fname,
                lastName: lname,
                username: fname,
                kbis: kbis,
                role: 'ADMIN',
                devise: null,
                contact: null,
                company: company,
                confirmed: false,
                password: password,
                createdAt: new Date(),
                updatedAt: new Date(),
            }))

            fetch("http://localhost:3000/api/users/", {
                method: 'POST',
                headers: {
                    // 'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: fname,
                    lastName: lname,
                    username: fname,
                    kbis: kbis,
                    email: email,
                    role: 'ADMIN',
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
                console.log(responseData)
            })
        }
        alert('Le formulaire a été soumis');
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
                    <form className={classes.form} onSubmit={(event) => handleSubmit(event)} noValidate>
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
                                />
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
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={(event) => handleChange(event)}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Adresse e-mail"
                                    name="email"
                                    autoComplete="email"
                                />
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
