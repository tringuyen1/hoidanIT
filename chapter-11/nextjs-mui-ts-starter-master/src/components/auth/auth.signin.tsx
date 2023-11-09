"use client";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Divider from '@mui/material/Divider';
import { signIn, signOut } from "next-auth/react"
import { redirect } from "next/navigation";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const registerSchema = object({
    email: string().nonempty("Email is required").email("Email is invalid"),
    password: string()
        .nonempty("Password is required")
        .min(1, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
});

type RegisterInput = TypeOf<typeof registerSchema>;

export default function AuthSignIn() {

    const [showPassword, setShowPassword] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [resMessage, setResMessage] = useState("");

    const {
        register,
        formState: { errors, isSubmitSuccessful },
        reset,
        handleSubmit,
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    });

    useEffect(() => {
        if (isSubmitSuccessful) {
            // call api
            setShowMessage(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);

    const onSubmitHandler: SubmitHandler<RegisterInput> = async (values) => {
        const res = await signIn("credentials", {
            username: values.email,
            password: values.password,
            redirect: false
        })

        if (!res?.error) {
            redirect("/");
        } else {
            console.log("login failed!");
            setResMessage("login failed!")
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main">
                <Grid sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 25 }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={5}
                        lg={4}
                        sx={{
                            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                            padding: "30px"
                        }}
                    >
                        <Box
                            sx={{
                                // marginTop: 30,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyItems: "center"
                            }}
                            className="login"
                        >
                            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box
                                component="form"
                                noValidate
                                sx={{ mt: 1 }}
                            >
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    autoComplete="email"
                                    autoFocus
                                    error={!!errors["email"]}
                                    helperText={errors["email"] ? errors["email"].message : ""}
                                    {...register("email")}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    autoComplete="current-password"
                                    error={!!errors["password"]}
                                    helperText={errors["password"] ? errors["password"].message : ""}
                                    {...register("password")}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={handleSubmit(onSubmitHandler)}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href={"/"} variant="body2">
                                            Back to home page
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href={"/auth/signup"} variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                        <Divider sx={{ marginTop: "20px" }}>Or using</Divider>
                        <div
                            className="icons"
                            style={{
                                marginTop: "20px",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Avatar
                                sx={{
                                    margin: "10px"
                                }}
                                onClick={() => { signIn("google", { redirect: false }) }}
                            >
                                <GoogleIcon
                                    sx={{ margin: "10px", fontSize: "30px", cursor: "pointer" }}
                                />
                            </Avatar>

                            <Avatar
                                sx={{
                                    margin: "10px"
                                }}
                                onClick={() => { signIn("github", { redirect: false }) }}
                            >
                                <GitHubIcon
                                    sx={{ margin: "10px", fontSize: "30px", cursor: "pointer" }}
                                />
                            </Avatar>
                        </div>
                    </Grid>
                </Grid>
                <Snackbar open={showMessage} autoHideDuration={2000} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                    <Alert severity="error" sx={{ width: '100%' }} onClose={() => setShowMessage(false)}>
                        {resMessage}
                    </Alert>
                </Snackbar>
            </Container>

        </ThemeProvider >
    );
}
