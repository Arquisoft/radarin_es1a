package com.uniovi.tests;
import java.util.List;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

import utils.SeleniumUtils;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class MainTest {



	// En Windows (Debe ser la versión 65.0.1 y desactivar las actualizacioens
	// automáticas)):
	static String PathFirefox86 = 
			"C:\\Program Files\\Mozilla Firefox\\firefox.exe";
	static String Geckdriver024 = System.getProperty("user.dir") 
			+ "\\lib\\geckodriver024win64.exe";

	static String testUsername = "radarines1atest";
	static String testPass ="R@darines1atest";
	
	static String adminUser = "radarines1a";
	static String adminPass = "radarinA1*";
	
	static String webID = "https://radarines1atest.solidcommunity.net";
	static WebDriver driver = getDriver(PathFirefox86, Geckdriver024);
	static String URL = "https://radarines1awebapp.herokuapp.com/welcome";
	static int timeout = 10;

	public static WebDriver getDriver(String PathFirefox, String Geckdriver) {
		System.setProperty("webdriver.firefox.bin", PathFirefox);
		System.setProperty("webdriver.gecko.driver", Geckdriver);
		WebDriver driver = new FirefoxDriver();
		return driver;
	}

	// Antes de cada prueba se navega al URL home de la aplicación
	@Before
	public void setUp() throws Exception {
		driver.navigate().to(URL);
	}


	// Después de cada prueba se borran las cookies del navegador
	@After
	public void tearDown() throws Exception {
		driver.manage().deleteAllCookies();
		driver.quit();
		driver = getDriver(PathFirefox86, Geckdriver024);
	}

	// Antes de la primera prueba
	@BeforeClass
	static public void begin() {

	}

	// Al finalizar la última prueba
	@AfterClass
	static public void end() {
		// Cerramos el navegador al finalizar las pruebas
		driver.quit();
	}
	
	
	

	/**
	 * Prueba de aceptación 1
	 * Nos loggeamos en la aplicacion, comprobamos que se muestra el mapa y nuestra posicion en el
	 * Prueba Semi-automatica, hay que aceptar la posicion y comprobar visualmente el mapa
	 */
	@Test 
	public void test01() { 
		loginAsTestUser();
		SeleniumUtils.esperarSegundos(driver, 12);		//se esperan segundos para dar tiempo a comprobarlo	

	}
	
	
	
	/**
	 * Prueba de aceptación 2
	 * Nos loggeamos en la aplicacion y cambiamos el rango de busqueda, volvemos al mapa y nos fijamos que ha cambiado
	 */
	@Test 
	public void test02() { 
		loginAsTestUser();
		//vemos que el rango por defecto son 5 km
		SeleniumUtils.esperarSegundos(driver, 7);
		//navegamos hasta las settings
		
		clickMenu(3);
		//cambiamos el rango
		WebElement input = SeleniumUtils.EsperaCargaPagina(driver, "id", "radius", timeout).get(0);
		input.click();
		input.sendKeys("100");
		//pulsamos el boton de aceptar
		SeleniumUtils.EsperaCargaPagina(driver, "id", "button", timeout).get(0).click();
		SeleniumUtils.esperarSegundos(driver, 7);		
	}
	
	/**
	 * Prueba de aceptación 3
	 * Comprobamos que podemos ver la lista de amigos y pulsar en un amigo para verlo en el mapa
	 */
	@Test 
	public void test03() { 
		loginAsTestUser();
		//navegamos hasta las settings para tener rango suficiente como para ver amigos		
		clickMenu(3);
		//cambiamos el rango
		WebElement input = SeleniumUtils.EsperaCargaPagina(driver, "id", "radius", timeout).get(0);
		input.click();
		input.sendKeys("100");
		//pulsamos el boton de aceptar
		SeleniumUtils.EsperaCargaPagina(driver, "id", "button", timeout).get(0).click();
		//vamos hasta la lista de amigos
		clickMenu(2);
		//pulsamos el votor de ir al mapa en miguel
		SeleniumUtils.EsperaCargaPagina(driver, "class", "MuiButton-label", timeout).get(1).click();
		//comprobamos que hemos ido a su localizacion( tenemos que verlo manualmente)
		SeleniumUtils.esperarSegundos(driver, 9);	
	}
	
	/**
	 * Prueba de aceptación 4
	 * Nos loggeamos en la aplicacion y cambiamos nuestro estado, comprobando que se actualiza y se mantiene al salir
	 */
	@Test 
	public void test04() { 
		loginAsTestUser();
		//navegamos hasta el perfil
		clickMenu(1);
		//probamos a pulsar los botones comprobando que funciona
		List<WebElement> buttons =  SeleniumUtils.EsperaCargaPagina(driver, "class", "MuiFormControlLabel-root", timeout);
		buttons.get(0).click();
		SeleniumUtils.esperarSegundos(driver, 1);
		buttons.get(1).click();
		SeleniumUtils.esperarSegundos(driver, 1);
		buttons.get(2).click();
		SeleniumUtils.esperarSegundos(driver, 1);
		//pulsamos el botón del covid
		SeleniumUtils.EsperaCargaPagina(driver, "class", "MuiButtonBase-root MuiIconButton-root jss7 MuiSwitch-switchBase MuiSwitch-colorPrimary", timeout).get(0).click();
		SeleniumUtils.esperarSegundos(driver, 1);
		//lo volvemos a pulsar para comprobar que funciona bien
		SeleniumUtils.EsperaCargaPagina(driver, "class", "MuiButtonBase-root MuiIconButton-root jss7 MuiSwitch-switchBase MuiSwitch-colorPrimary", timeout).get(0).click();
		SeleniumUtils.esperarSegundos(driver, 1);
		//volvemos al estado de antes
		SeleniumUtils.esperarSegundos(driver, 1);
		buttons.get(1).click();
	}
	
	/**
	 * Prueba de aceptación 5
	 * Comprobamos que aparece la vista de administrador al loggearnos como admin
	 */
	@Test 
	public void test05() { 
		loginAsAdminUser();
		SeleniumUtils.EsperaCargaPagina(driver, "text", "Total users", timeout);
		SeleniumUtils.EsperaCargaPagina(driver, "text", "Latitude", timeout);
		SeleniumUtils.EsperaCargaPagina(driver, "text", "User State", timeout);
	
	}
	


	/**
	 * Pulsa la opcion del menu indicada por el numero
	 * @param option
	 */
	private void clickMenu(int option) {
		SeleniumUtils.EsperaCargaPagina(driver, "id", "react-burger-menu-btn", timeout).get(0).click();
		SeleniumUtils.EsperaCargaPagina(driver, "class", "nav-link nav-link", timeout).get(option).click();
		
	}
	
	
	private void loginAsTestUser() {
		login(testUsername, testPass);
	}

	
	private void loginAsAdminUser() {
		login(adminUser, adminPass);
		
	}
	
	/**
	 * Used to log in the app 
	 * 
	 */
	private void login(String username, String password) {
		// Vamos al formulario de registro
				SeleniumUtils.textoPresentePagina(driver, "Solid");
				SeleniumUtils.textoPresentePagina(driver, "Radarin");
				SeleniumUtils.textoPresentePagina(driver, "Developers");
				SeleniumUtils.textoPresentePagina(driver, "Documentation");

				//vamos hasta la página de login
				driver.navigate().to("https://radarines1awebapp.herokuapp.com/login");
				SeleniumUtils.textoPresentePagina(driver, "Please login to continue");
				//escribimos el webID
				WebElement webIDInput = driver.findElement(By.name("idp"));
				webIDInput.click();
				webIDInput.sendKeys("https://" + username + ".solidcommunity.net");
				//pulsamos botón de login
				List<WebElement> list =  SeleniumUtils.EsperaCargaPagina(driver, "class", "sc-gzVnrw isbeaB", 10);
				WebElement submit = list.get(0);
				submit.click();
				//rellenamos el usuario y la contraseña
				WebElement usernameInput = SeleniumUtils.EsperaCargaPagina(driver, "id", "username", timeout).get(0);
				usernameInput.click();
				usernameInput.sendKeys(username);
				WebElement passInput = SeleniumUtils.EsperaCargaPagina(driver, "id", "password", timeout).get(0);
				passInput.click();
				passInput.sendKeys(password);
				//confirmamos y pulsamos el botón de login
				SeleniumUtils.EsperaCargaPagina(driver, "id", "login", timeout).get(0).click();
	}


}