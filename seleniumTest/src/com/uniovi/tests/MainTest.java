package com.uniovi.tests;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
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
		login();
		SeleniumUtils.esperarSegundos(driver, 12);		//se esperan segundos para dar tiempo a comprobarlo	

	}
	
	
	
	/**
	 * Prueba de aceptación 3
	 * Nos loggeamos en la aplicacion y cambiamos el rango de busqueda, volvemos al mapa y nos fijamos que ha cambiado
	 */
	@Test 
	public void test03() { 
		login();
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
	 * Prueba de aceptación 2
	 * Nos loggeamos en la aplicacion y cambiamos nuestro estado, comprobando que se actualiza y se mantiene al salir
	 */
	@Test 
	public void test04() { 
		login();
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
	}
	
	
	/**
	 * Pulsa la opcion del menu indicada por el numero
	 * @param option
	 */
	private void clickMenu(int option) {
		SeleniumUtils.EsperaCargaPagina(driver, "id", "react-burger-menu-btn", timeout).get(0).click();
		SeleniumUtils.EsperaCargaPagina(driver, "class", "nav-link nav-link", timeout).get(option).click();
		
	}
	
	
	/**
	 * Used to log in the app 
	 * 
	 */
	private void login() {
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
				webIDInput.sendKeys(webID);
				//pulsamos botón de login
				List<WebElement> list =  SeleniumUtils.EsperaCargaPagina(driver, "class", "sc-gzVnrw isbeaB", 10);
				WebElement submit = list.get(0);
				submit.click();
				//rellenamos el usuario y la contraseña
				WebElement usernameInput = SeleniumUtils.EsperaCargaPagina(driver, "id", "username", timeout).get(0);
				usernameInput.click();
				usernameInput.sendKeys(testUsername);
				WebElement passInput = SeleniumUtils.EsperaCargaPagina(driver, "id", "password", timeout).get(0);
				passInput.click();
				passInput.sendKeys(testPass);
				//confirmamos y pulsamos el botón de login
				SeleniumUtils.EsperaCargaPagina(driver, "id", "login", timeout).get(0).click();
	}



	/*

	// [prueba2] Registro de Usuario con datos inválidos // (email vacío, nombre
	//	  vacío, apellidos vacíos).


	// [prueba1] Registro de Usuario con datos válidos.

	@Test public void prueba01() { 
		// Vamos al formulario de registro
		PO_HomeView.clickOption(driver, "signup", "class", "btn btn-primary"); 
		//  Rellenamos el formulario 
		PO_RegisterView.fillForm(driver, "prueba1@sdi.com", "prueba", 
				"Número Uno", "11111", "11111"); 
		// Comprobamos que entramos en la sección privada 
		SeleniumUtils.textoPresentePagina(driver, "Desconectarse"); }

	// [prueba2] Registro de Usuario con datos inválidos // (email vacío, nombre
	//	  vacío, apellidos vacíos).

	@Test public void prueba02() {
		// EMAIL VACÍO
		// Vamos al formulario de registro 
		PO_HomeView.clickOption(driver, "signup","class", "btn btn-primary"); 
		// Rellenamos el formulario
		PO_RegisterView.fillForm(driver, "     ", "prueba", "Número Dos", 
				"11111","11111"); 
		SeleniumUtils.textoPresentePagina(driver,
						"Este campo no puede ser dejado en blanco");

		// NOMBRE VACÍO
		// Vamos al formulario de registro
		PO_HomeView.clickOption(driver, "signup", "class", "btn btn-primary"); 
		// Rellenamos el formulario
		PO_RegisterView.fillForm(driver, "pr2@sdi.com", "     ", "Número Dos", 
				"11111", "11111");
		SeleniumUtils.textoPresentePagina(driver, 
				"Este campo no puede ser dejado en blanco");

		// APELLIDOS VACÍOS

		// Vamos al formulario de registro
		PO_HomeView.clickOption(driver, "signup", "class", "btn btn-primary"); 
		// Rellenamos el formulario
		PO_RegisterView.fillForm(driver, "pr2@sdi.com", "prueba", "     ", ""
				+ "11111", "11111");
		SeleniumUtils.textoPresentePagina(driver, 
				"Este campo no puede ser dejado en blanco");
	}

	//	  // [prueba3] Registro de Usuario con datos inválidos // (repetición de
	//	  contraseña inválida).

	@Test public void prueba03() { 
		// Vamos al formulario de registro
		PO_HomeView.clickOption(driver, "signup", "class", "btn btn-primary"); 
		//  Rellenamos el formulario 
		PO_RegisterView.fillForm(driver, "prueba3@sdi.com",
				"prueba", "Número Tres", "11111", "11112"); 
		PO_RegisterView.checkKey(driver,
						"Error.signup.passwordConfirm.coincidence", 
						PO_Properties.getSPANISH()); 
	}

	// [prueba3] Registro de Usuario con datos inválidos (email existente).

	@Test public void prueba04() { 
		// Vamos al formulario de registro
		PO_HomeView.clickOption(driver, "signup", "class", "btn btn-primary"); 
		//  Rellenamos el formulario 
		PO_RegisterView.fillForm(driver, "Samu@correo",
				"prueba", "Número Cuatro", "11111", "11111");
		PO_RegisterView.checkKey(driver, "Error.signup.email.duplicate",
				PO_Properties.getSPANISH()); 
	}

	//pruebaS LOGIN

	// [prueba5] Inicio de sesión con datos válidos (administrador).

	@Test public void prueba05() { 
		PO_LoginView.login(driver, "admin@email.com","admin"); 
		// Comprobamos que entramos en la sección privada
		SeleniumUtils.textoPresentePagina(driver, "Gestion de Usuarios"); 
	}

	// [prueba6] Inicio de sesión con datos válidos (usuario estándar).
	@Test public void prueba06() { 
		PO_LoginView.login(driver, "Samu@correo", "123456"); 
		// Comprobamos que entramos en la sección privada
		SeleniumUtils.textoPresentePagina(driver, "Desconectarse"); 
	}

	// [prueba7] Inicio de sesión con datos inválidos // 
	// (usuario estándar, campo email y contraseña vacíos)

	@Test public void prueba07() { // Vamos al formulario de registro

		PO_HomeView.clickOption(driver, "login", "class", "btn btn-primary"); 
		// Rellenamos el formulario 
		PO_LoginView.fillForm(driver, " ", " "); 
		//  Comprobamos que entramos en la sección privada
		SeleniumUtils.textoPresentePagina(driver, "Identificarse"); }

	// [prueba8] Inicio de sesión con datos válidos // (usuario estándar, email
	//	  existente, pero contraseña incorrecta).

	@Test public void prueba08() { PO_LoginView.login(driver, "taso@email",
			"12345"); // Comprobamos que ha fallado el login
	SeleniumUtils.textoPresentePagina(driver, "Las credenciales no coinciden.");
	}

	// [prueba9] Inicio de sesión con datos inválidos // (usuario estándar, email
	//	  no existente en la aplicación).

	@Test public void prueba09() { PO_LoginView.login(driver, "taso@emailss",
			"123456"); // Comprobamos que ha fallado el login
	SeleniumUtils.textoPresentePagina(driver, "Las credenciales no coinciden.");
	}

	//pruebaS LOGOUT

	// [prueba10] Hacer click en la opción de salir de sesión // y comprobar que
	//	  se redirige a la página de inicio de sesión (Login).

	@Test public void prueba10() { PO_LoginView.login(driver, "taso@email",
			"123456"); PO_NavView.clickOption(driver, "logout", "class",
					"btn btn-primary"); // Comprobamos que hemos vuelto al login
			SeleniumUtils.textoPresentePagina(driver, "Identifícate"); }

	// [prueba11] Comprobar que el botón cerrar sesión no está visible // si el
	//	  usuario no está autenticado.

	@Test public void prueba11() { SeleniumUtils.textoNoPresentePagina(driver,
			"Desconectarse");


	PO_LoginView.login(driver, "taso@email", "123456");

	SeleniumUtils.textoPresentePagina(driver, "Desconectarse"); 
	//hacemos click en el boton de desconectarse (ahora si está presente)
	PO_NavView.clickOption(driver, "logout", "class", "btn btn-primary"); 
	//	  Comprobamos que el botón desaparece
	SeleniumUtils.textoNoPresentePagina(driver, "Desconectarse"); }

	// [prueba12] Mostrar el listado de usuarios y comprobar que se muestran //
	// todos los que existen en el sistema.

	@Test public void prueba12() { 
		PO_LoginView.login(driver, "admin@email.com",	  "admin");

		SeleniumUtils.textoPresentePagina(driver, "Desconectarse"); 
		// Nos dirigimos	  a la lista de usuarios 
		PO_NavView.clickNavOption(driver, "users-menu",
				"user/list"); 
		// Comprobamos que aparecen todos los usuarios registrados
		List<User> usersList = usersService.getUsers();

		for (User u : usersList) { 
			SeleniumUtils.textoPresentePagina(driver,u.getEmail()); 
			SeleniumUtils.textoPresentePagina(driver, u.getName()); 
		}
	}


	//	  // [prueba13] Ir a la lista de usuarios, borrar el primer usuario de la
	//	  lista, //comprobar que la lista se actualiza y que el usuario desaparece.
	//	  
	@Test public void prueba13() { 
		PO_LoginView.login(driver, "admin@email.com",	  "admin"); 
		PO_NavView.clickNavOption(driver, "users-menu", "user/list");
		PO_ListUsers.clickCheckbox(driver, "" +
				usersService.getUserByEmail("paco@correo").getId()); 
		// Comprobamos que  aparecen todos los usuarios registrados
		SeleniumUtils.textoPresentePagina(driver, "paco@correo");
		PO_ListUsers.deleteUsers(driver); SeleniumUtils.textoNoPresentePagina(
				driver,"paco@correo"); 
		//comprobamos que el usuario desaparece del sistema 
		User user = usersService.getUserByEmail("paco@correo"); 
		assertNull(user);
	}


	// [prueba14] Ir a la lista de usuarios, borrar el ultimo usuario de la
	//	  lista, comprobar que la lista se actualiza y que el usuario desaparece.

	@Test public void prueba14() { 
		PO_LoginView.login(driver, "admin@email.com",	"admin"); 
		PO_NavView.clickNavOption(driver, "users-menu", "user/list");
		SeleniumUtils.esperarSegundos(driver,1); PO_ListUsers.clickCheckbox(
				driver,"" + usersService.getUserByEmail("Samu@correo").getId()); 
		// Comprobamos que	aparecen todos los usuarios registrados
		SeleniumUtils.textoPresentePagina(driver, "Samu@correo");
		PO_ListUsers.deleteUsers(driver); SeleniumUtils.textoNoPresentePagina(
				driver,"Samu@correo"); 
		//comprobamos que el usuario desaparece del sistema 
		User user= usersService.getUserByEmail("Samu@correo"); 
		assertNull(user);
	}


	// [prueba15] Ir a la lista de usuarios, borrar 3 usuarios, comprobar que la
	// lista se actualiza y que los usuarios desaparecen.

	@Test public void prueba15() { 
		PO_LoginView.login(driver, "admin@email.com","admin"); 
		PO_NavView.clickNavOption(driver, "users-menu", "user/list");
		SeleniumUtils.EsperaCargaPagina(driver, "text", "ibai", 3);

		//seleccionamos 3 usuarios para borrar 
		User user1 =usersService.getUserByEmail("taso@email"); 
		PO_ListUsers.clickCheckbox(driver,	"" +user1.getId());


		User user2 = usersService.getUserByEmail("correoDeMarta");
		PO_ListUsers.clickCheckbox(driver, "" +user2.getId());


		User user3 = usersService.getUserByEmail("paco@correo");
		PO_ListUsers.clickCheckbox(driver, "" +user3.getId()); 
		// Comprobamos que	aparecen todos los usuarios seleccionados
		SeleniumUtils.textoPresentePagina(driver, user1.getEmail());
		SeleniumUtils.textoPresentePagina(driver, user2.getEmail());
		SeleniumUtils.textoPresentePagina(driver, user3.getEmail());
		PO_ListUsers.deleteUsers(driver);
		//desaparecen los usuarios borrados
		SeleniumUtils.textoNoPresentePagina(driver, user1.getEmail());
		SeleniumUtils.textoNoPresentePagina(driver, user2.getEmail());
		SeleniumUtils.textoNoPresentePagina(driver, user3.getEmail()); 

		//comprobamos que los usuarios desaparecen del sistema 
		user1 = usersService.getUserByEmail("taso@email"); 
		user2 =	usersService.getUserByEmail("correoDeMarta"); 
		user3 =	usersService.getUserByEmail("paco@correo"); 
		assertNull(user1);
		assertNull(user2); 
		assertNull(user3);

	}

	// [prueba16] Ir al formulario de alta de oferta, // rellenarla con datos
	//	válidos y pulsar el botón Submit. // Comprobar que la oferta sale en el
	//	listado de ofertas de dicho usuario.

	@Test public void prueba16() { 
		PO_LoginView.login(driver, "Samu@correo",	"123456");
		// Hacemos click en Publicar una oferta
		PO_NavView.clickNavOption(driver, "offers-menu", "offer/add");
		// Rellenamos	el formulario 
		PO_AddOfferView.fillForm(driver, "HDD Toshiba P300",
				"Vendo disco duro en perfecto estado", 50); 
		// Vamos a Mis Ofertas ycomprobamos que la oferta está ahí 
		PO_NavView.clickNavOption(driver,"offers-menu", "offer/sale"); 
		SeleniumUtils.textoPresentePagina(driver,		"HDD Toshiba P300"); }

	// [prueba17] Ir al formulario de alta de oferta, // rellenarla con datos
	// inválidos (campo título vacío) y pulsar // el botón Submit. 
	// Comprobar que se muestra el mensaje de campo obligatorio.
	@Test public void prueba17() { PO_LoginView.login(driver, "Samu@correo",
			"123456"); // Hacemos click en Publicar una oferta
		PO_NavView.clickNavOption(driver, "offers-menu", "offer/add");
		// Rellenamosel formulario
		PO_AddOfferView.fillForm(driver, "      ", 
				"Vendo disco duro en perfecto estado", 50);
		// Comprobamos que se muestra el mensaje de error
		SeleniumUtils.textoPresentePagina(driver, 
				"Este campo no puede ser dejado en blanco");
	}


	// [prueba18] Mostrar el listado de ofertas para dicho usuario
	// y comprobar que se muestran todas los que existen para este usuario.
	@Test
	public void prueba18() {
		PO_LoginView.login(driver, "Samu@correo", "123456");

		// Hacemos click en Mis ofertas
		PO_NavView.clickNavOption(driver, "offers-menu", "offer/sale");

		// Contamos el número de ofertas mostradas (2 de las 4 en total)
		List<WebElement> elementos = SeleniumUtils.EsperaCargaPagina(driver, 
				"free", "//tbody/tr", PO_View.getTimeout());
		assertTrue(elementos.size() == 3);
		// Comprobamos que sean las ofertas creadas por el usuario
		SeleniumUtils.textoPresentePagina(driver, 
				"Bate de béisbol nuevo del paquete");
		SeleniumUtils.textoPresentePagina(driver, 
				"Figura de Gogeta Super Saiyan 4");
		SeleniumUtils.textoPresentePagina(driver, 
				"Modelo Z120. 2 meses de uso.");
	}

	// [prueba19] Ir a la lista de ofertas, borrar la primera oferta de la lista,
	// comprobar que la lista se actualiza y que la oferta desaparece.
	@Test
	public void prueba19() {
		PO_LoginView.login(driver, "Samu@correo", "123456");

		// Hacemos click en Mis ofertas
		PO_NavView.clickNavOption(driver, "offers-menu", "offer/sale");

		// Borramos la primera oferta
		By enlace = By.xpath("(//table[@class='table table-hover']//a)[2]");
		String nombreOferta = driver
				.findElement(By.xpath("html[1]/body[1]/div[1]/div[1]/table[1]"
						+ "/tbody[1]/tr[1]/td[1]")).getText();

		driver.findElement(enlace).click();

		// Comprobamos que solo hay una oferta y ya no existe la eliminada
		SeleniumUtils.esperarSegundos(driver, 5);
		List<WebElement> elementos = SeleniumUtils.EsperaCargaPagina(driver, 
				"free", "//tbody/tr", PO_View.getTimeout());

		assertTrue(elementos.size() == 2);
		SeleniumUtils.textoNoPresentePagina(driver, nombreOferta);
	}

	// [prueba20] Ir a la lista de ofertas, borrar la última oferta de la
	// lista, comprobar que la lista se actualiza y que la oferta desaparece.
	@Test
	public void prueba20() {
		PO_LoginView.login(driver, "Samu@correo", "123456");

		// Hacemos click en Mis ofertas
		PO_NavView.clickNavOption(driver, "offers-menu", "offer/sale");

		// Borramos la primera oferta
		By enlace = By.xpath("html[1]/body[1]/div[1]/div[1]" 
					+ "/table[1]/tbody[1]/tr[3]/td[5]/a[1]");
		String nombreOferta = driver
				.findElement(By.xpath("html[1]/body[1]/div[1]/div[1]"
						+ "/table[1]/tbody[1]/tr[3]/td[1]")).getText();
		driver.findElement(enlace).click();

		// Comprobamos que solo hay una oferta y ya no existe la eliminada
		SeleniumUtils.esperarSegundos(driver, 1);
		List<WebElement> elementos = SeleniumUtils.EsperaCargaPagina(driver, 
				"free", "//tbody/tr", PO_View.getTimeout());

		assertTrue(elementos.size() == 2);
		SeleniumUtils.textoNoPresentePagina(driver, nombreOferta);
	}

	// [prueba21] Hacer una búsqueda con el campo vacío y comprobar que se muestra
	// la página que corresponde con el listado de las ofertas existentes en el
	// sistema
	@Test
	public void prueba21() {
		// logueamos y vamos a la pagina
		PO_LoginView.login(driver, "taso@email", "123456");
		PO_NavView.clickNavOption(driver, "offers-menu", "offer/list");

		PO_ListOffers.search(driver, "");
		List<Offer> offers = offerService.getOffers();
		//comrpobamos que cada objeto esta en una pagina al menos
		boolean condicion;
		for (int i  = 0; i< offers.size(); i++){
			condicion =false;
			SeleniumUtils.EsperaCargaPagina(driver, "text", "Primera", 2);
			PO_PrivateView.goToPage(driver, 1);
			condicion = condicion ||  SeleniumUtils.
					textoPresentePaginaBool(driver, offers.get(i).getTitle());
			SeleniumUtils.EsperaCargaPagina(driver, "text", "Primera", 2);
			PO_PrivateView.goToPage(driver, 2);
			condicion = condicion ||  SeleniumUtils.
					textoPresentePaginaBool(driver, offers.get(i).getTitle());
			SeleniumUtils.EsperaCargaPagina(driver, "text", "Primera", 2);
			PO_PrivateView.goToPage(driver, 3);
			condicion = condicion ||  SeleniumUtils.
					textoPresentePaginaBool(driver, offers.get(i).getTitle());
			SeleniumUtils.EsperaCargaPagina(driver, "text", "Primera", 2);
			PO_PrivateView.goToPage(driver, 3);
			condicion = condicion ||  SeleniumUtils.
					textoPresentePaginaBool(driver, offers.get(i).getTitle());
			SeleniumUtils.EsperaCargaPagina(driver, "text", "5", 2);
			PO_PrivateView.goToPage(driver, 3);
			condicion = condicion ||  SeleniumUtils.
					textoPresentePaginaBool(driver, offers.get(i).getTitle());
			SeleniumUtils.EsperaCargaPagina(driver, "text", "Primera", 2);
			PO_PrivateView.goToPage(driver, 0);
			assertTrue(condicion);
		}

	}

	// [prueba22] Hacer una búsqueda escribiendo en el campo un texto que no exista
	// y comprobar que se
	// muestra la página que corresponde, con la lista de ofertas vacía.
	@Test
	public void prueba22() {
		PO_LoginView.login(driver, "taso@email", "123456");
		PO_NavView.clickNavOption(driver, "offers-menu", "offer/list");

		PO_ListOffers.search(driver, 
				"texto que no existe, no deberia de aparecer nada");
		PO_ListOffers.checkNOffers(driver, 0);
	}

	// [prueba22_extra] Hacer una búsqueda cualquiera, luego volver a realizar otr
	// busqueda vacia que encuentre todo
	@Test
	public void prueba22_extra1() {
		PO_LoginView.login(driver, "taso@email", "123456");
		PO_NavView.clickNavOption(driver, "offers-menu", "offer/list");
		PO_ListOffers.search(driver, 
				"texto que no existe, no deberia de aparecer nada");
		// ahora deberia de encontrar todos, es decir, sacar 5 ofertas
		PO_ListOffers.search(driver, "");
		PO_ListOffers.checkNOffers(driver, 5);
	}

	// [prueba22_extra] Hacemos busqueda por el titulo de la oferta
	@Test
	public void prueba22_extra2() {
		PO_LoginView.login(driver, "taso@email", "123456");
		PO_NavView.clickNavOption(driver, "offers-menu", "offer/list");
		PO_ListOffers.search(driver, 
				"texto que no existe, no deberia de aparecer nada");
		// ahora deberia de encontrar todos, es decir, sacar 5 ofertas
		PO_ListOffers.search(driver, "Oferta 1");
		// hay una sola oferta
		PO_ListOffers.checkNOffers(driver, 1);
		SeleniumUtils.textoPresentePagina(driver, "Oferta 1");
	}

	// [prueba22_extra] Hacemos busqueda por texto, no deberia de aparecer
	@Test
	public void prueba22_extra3() {
		PO_LoginView.login(driver, "taso@email", "123456");
		PO_NavView.clickNavOption(driver, "offers-menu", "offer/list");
		PO_ListOffers.search(driver, 
				"texto que no existe, no deberia de aparecer nada");
		// ahora deberia de encontrar todos, es decir, sacar 5 ofertas
		PO_ListOffers.search(driver, "XIX");
		// hay una sola oferta
		PO_ListOffers.checkNOffers(driver, 0);
		SeleniumUtils.textoNoPresentePagina(driver, "XIX");
	}

	 // [prueba23] Sobre una búsqueda determinada (a elección del desarrollador),
    // comprar una oferta que deja saldo positivo en el contador del comprador.
    // Comprobar que el contador se actualiza correctamente en la vista del
    // comprador.
    @Test
    public void prueba23() {
        // Iniciamos sesión
        PO_LoginView.login(driver, "Samu@correo", "123456");
        // Nos dirigimos a la lista de ofertas
        PO_NavView.clickNavOption(driver, "offers-menu", "offer/list");
        // Buscamos una oferta que se pueda comprar y deje saldo positivo
        PO_ListOffers.search(driver, "Cuchillo");
        // Compramos la oferta
        double viejoSaldo = Double
                .parseDouble(driver.findElement(By.xpath("//div[@id='myNavbar']"
                        + "/ul[2]/li[2]/a[1]/span[1]")).getText());

        double precio = Double.parseDouble(
                        driver.findElement(By.xpath("//table[@id='tableOffers']" 
                                + "/tbody[1]/tr[1]/td[3]"))
                                .getText().replace("€", ""));

        WebElement boton = driver.findElement(
                        By.xpath("//table[@id='tableOffers']/tbody[1]/tr[1]"
                                + "/td[5]/div[1]/div[1]/a[1]"));

        boton.click();
        // Comprobamos que el saldo haya decrementado y sea mayor que 0
        double nuevoSaldo = Double
                .parseDouble(driver.findElement(By.xpath("//div[@id='myNavbar']"
                        + "/ul[2]/li[2]/a[1]/span[1]")).getText());
        assertTrue(nuevoSaldo > 0);
        assertEquals(nuevoSaldo, viejoSaldo - precio, 0.01);
    }



	// [prueba24] Sobre una búsqueda determinada (a elección del desarrollador),
	// comprar una oferta que deja un saldo 0 en el contador del comprador.
	// Comprobar que el contador se actualiza correctamente en la vista del
	// comprador.
	@Test
	public void prueba24() {
		// Iniciamos sesión
		PO_LoginView.login(driver, "pruebaSaldo0", "123456");
		// Nos dirigimos a la lista de ofertas
		PO_NavView.clickNavOption(driver, "offers-menu", "offer/list");
		// Buscamos una oferta que se pueda comprar y deje saldo 0
		PO_ListOffers.search(driver, "hina");
		// Compramos la oferta
		double viejoSaldo = Double
				.parseDouble(driver.findElement(By.xpath("//div[@id='myNavbar']"
						+ "/ul[2]/li[2]/a[1]/span[1]")).getText());
		double precio = Double
				.parseDouble(driver.findElement(
						By.xpath("//table[@id='tableOffers']" 
								+ "/tbody[1]/tr[1]/td[3]"))
								.getText().replace("€", ""));
		By enlace = By.xpath("//table[@id='tableOffers']/tbody[1]/tr[1]/td[5]" 
								+ "/div[1]/div[1]/a[1]");
		driver.findElement(enlace).click();
		// Comprobamos que el saldo haya decrementado y sea mayor que 0
		double nuevoSaldo = Double
				.parseDouble(driver.findElement(
						By.xpath("//div[@id='myNavbar']/ul[2]/li[2]/a[1]"
								+ "/span[1]")).getText());
		assertTrue(nuevoSaldo == 0);
		assertEquals(nuevoSaldo, viejoSaldo - precio, 0.01);
	}

	// [prueba25] comprar oferta demasiado cara
	// comprador.
	@Test
	public void prueba25() {
		// Iniciamos sesión
		PO_LoginView.login(driver, "pruebaSaldo0", "123456");
		// Nos dirigimos a la lista de ofertas
		PO_NavView.clickNavOption(driver, "offers-menu", "offer/list");
		// Buscamos una oferta que no se pueda comprar
		PO_ListOffers.search(driver, "Balón");
		// Compramos la oferta
		double viejoSaldo = Double
				.parseDouble(driver.findElement(By.xpath("//div[@id='myNavbar']"
						+ "/ul[2]/li[2]/a[1]/span[1]")).getText());
		By enlace = By.xpath("//table[@id='tableOffers']/tbody[1]/tr[1]/td[5]" 
						+ "/div[1]/div[1]/a[1]");
		driver.findElement(enlace).click();
		// Comprobamos que haya aparecido el mensaje y el saldo no haya cambiado
		PO_ListOffers.checkKey(driver, "offer.list.cantBuy", 
				PO_Properties.getSPANISH());
		double nuevoSaldo = Double
				.parseDouble(
						driver.findElement(
								By.xpath("//div[@id='myNavbar']/ul[2]/li[2]"
										+ "/a[1]/span[1]")).getText());
		assertEquals(nuevoSaldo, viejoSaldo, 0.01);
	}

	// [prueba26] Ir a la opción de ofertas compradas del usuario y mostrar // la
	//	  lista. Comprobar que aparecenl as ofertas que deben aparecer.

	@Test public void prueba26() { 
		PO_LoginView.login(driver,"taso@email",  "123456"); 
		PO_NavView.clickNavOption(driver, "offers-menu", "offer/bought");
		List<Offer> offers = offerService.getOffersForBuyer("taso@email"); 
		for(Offer  o : offers) { 
			SeleniumUtils.textoPresentePagina(driver, o.getDetails());
			SeleniumUtils.textoPresentePagina(driver, o.getTitle());
			SeleniumUtils.textoPresentePagina(driver, "" +o.getPrice()); 
		} 
	}

	// [prueba27] Visualizar al menos cuatro páginas haciendo el cambio 
	//  español/inglés/español (comprobando que algunas de las etiquetas cambian 
	//  al idioma correspondiente). Página principal/Opciones principales de 
	//  usuario/Listado de usuarios /Vista de alta de oferta.

	@Test

	//primera parte, pagina principal 
	public void prueba27() {
		PO_LoginView.login(driver, "taso@email", "123456");

		prueba27_1(); 
		prueba27_2(); 
		prueba27_3(); 
		prueba27_4(); 
	}

	//primera parte, pagina principal 
	public void prueba27_1() { 
		//estamos en  español
		SeleniumUtils.textoPresentePagina(driver, "Desconectarse");
		SeleniumUtils.textoPresentePagina(driver, "Idioma");
		SeleniumUtils.textoPresentePagina(driver,
				"Bienvenidos a la página principal");
		SeleniumUtils.textoPresentePagina(driver,
				"Esta es una zona privada de la web");
		SeleniumUtils.textoPresentePagina(driver, "Usuario autenticado como:");
		PO_NavView.changeIdiom(driver, "English"); //cambiamos a ingles
		SeleniumUtils.textoPresentePagina(driver, "Log out");
		SeleniumUtils.textoPresentePagina(driver, "Language");
		SeleniumUtils.textoPresentePagina(driver, "Welcome to the main page");
		SeleniumUtils.textoPresentePagina(driver,
				"private area of ​​the web");
		SeleniumUtils.textoPresentePagina(driver, "User authenticated as:");

		//cambiamos otra vez a español 
		PO_NavView.changeIdiom(driver, "Spanish");
		SeleniumUtils.textoPresentePagina(driver, "Desconectarse");
		SeleniumUtils.textoPresentePagina(driver, "Idioma");
		SeleniumUtils.textoPresentePagina(driver,
				"Bienvenidos a la página principal");
		SeleniumUtils.textoPresentePagina(driver,
				"Esta es una zona privada de la web");
		SeleniumUtils.textoPresentePagina(driver, "Usuario autenticado como:"); }

	//segunda parte, Alta de oferta 
	public void	  prueba27_2() {
		PO_NavView.clickNavOption(driver, "offers-menu", "offer/add"); 
		//rellenamos con campos incorrectos para que se muestren errores

		PO_AddOfferView.fillForm(driver, "  ","  ", 50); //estamos en español
		SeleniumUtils.EsperaCargaPagina(driver, "text", 
				"Crear una nueva oferta", 3);
		SeleniumUtils.textoPresentePagina(driver, "Título");
		SeleniumUtils.textoPresentePagina(driver, "Precio");
		SeleniumUtils.textoPresentePagina(driver, "Publicar");
		PO_NavView.changeIdiom(driver, "English");

		PO_AddOfferView.fillForm(driver, "  ","  ", 50); //cambiamos a ingles
		SeleniumUtils.EsperaCargaPagina(driver, "text", "Create a new offer", 3);
		SeleniumUtils.textoPresentePagina(driver, "Title");
		SeleniumUtils.textoPresentePagina(driver, "Price");
		SeleniumUtils.textoPresentePagina(driver, "Publish");

		PO_AddOfferView.fillForm(driver, "  ","  ", 50); 
		//cambiamos otra vez a	  español 
		PO_NavView.changeIdiom(driver, "Spanish");
		SeleniumUtils.EsperaCargaPagina(driver, "text", 
				"Crear una nueva oferta", 3);
		SeleniumUtils.textoPresentePagina(driver, "Título");
		SeleniumUtils.textoPresentePagina(driver, "Precio");
		SeleniumUtils.textoPresentePagina(driver, "Publicar"); }

	//segunda parte, Alta de oferta 
	public void prueba27_3() {
		PO_NavView.clickNavOption(driver, "offers-menu", "offer/list"); 
		//rellenamos  con campos incorrectos para que se muestren errores 
		//estamos en español
		SeleniumUtils.EsperaCargaPagina(driver, "text", "Estado", 3);
		SeleniumUtils.textoPresentePagina(driver, "Todas las ofertas");
		SeleniumUtils.textoPresentePagina(driver, "Detalle");
		SeleniumUtils.textoPresentePagina(driver, "Primera");
		SeleniumUtils.textoPresentePagina(driver, "Última");
		SeleniumUtils.textoPresentePagina(driver,
				"Estas son todas las ofertas que figuran en el sistema:");
		PO_NavView.changeIdiom(driver, "English");

		//cambiamos a ingles 
		SeleniumUtils.EsperaCargaPagina(driver, "text", "Status", 3); 
		SeleniumUtils.textoPresentePagina(driver, "All offers");
		SeleniumUtils.textoPresentePagina(driver, "Detail");
		SeleniumUtils.textoPresentePagina(driver, "First");
		SeleniumUtils.textoPresentePagina(driver, "Last");
		SeleniumUtils.textoPresentePagina(driver,
				"These are all the offers that appear in the system:"); 
		//cambiamos otra vez  a español 
		PO_NavView.changeIdiom(driver, "Spanish");
		SeleniumUtils.EsperaCargaPagina(driver, "text", "Estado", 3);
		SeleniumUtils.textoPresentePagina(driver, "Todas las ofertas");
		SeleniumUtils.textoPresentePagina(driver, "Detalle");
		SeleniumUtils.textoPresentePagina(driver, "Primera");
		SeleniumUtils.textoPresentePagina(driver, "Última");
		SeleniumUtils.textoPresentePagina(driver,
				"Estas son todas las ofertas que figuran en el sistema:"); }

	// Cuarta parte, lista de usuarios 
	public void prueba27_4() {
		PO_LoginView.logout(driver, "Identificarse"); 
		PO_LoginView.login(driver, "admin@email.com", "admin"); 
		PO_NavView.clickNavOption(driver, "users-menu",  "user/list");

		// Estamos en español
		SeleniumUtils.EsperaCargaPagina(driver, "free",
				"//input[@placeholder=" 
						+ "'Buscar usuarios por nombre, apellidos o email']", 
							PO_View.getTimeout());
		SeleniumUtils.textoPresentePagina(driver, "Buscar");
		SeleniumUtils.textoPresentePagina(driver, "Usuarios");
		PO_View.checkKey(driver, "users.list.registeredUsers", 
				PO_Properties.getSPANISH());
		SeleniumUtils.textoPresentePagina(driver, "Actualizar");
		SeleniumUtils.textoPresentePagina(driver, "Seleccionado");
		SeleniumUtils.textoPresentePagina(driver, "Correo Electrónico");
		SeleniumUtils.textoPresentePagina(driver, "Nombre");
		SeleniumUtils.textoPresentePagina(driver, "Apellidos");
		String textoBoton = driver.findElement(
				By.xpath("//input[@id='delete-button']")).getAttribute("value");
		assertEquals(textoBoton, "Eliminar Usuarios");

		// Cambiamos a inglés 
		PO_NavView.changeIdiom(driver, "English");
		SeleniumUtils.EsperaCargaPagina(driver, "free",
				"//input[@placeholder=" 
						+ "'Search users by first name, last name or email']", 
						PO_View.getTimeout());
		SeleniumUtils.textoPresentePagina(driver, "Search");
		SeleniumUtils.textoPresentePagina(driver, "Users");
		PO_View.checkKey(driver, "users.list.registeredUsers", 
				PO_Properties.getENGLISH());
		SeleniumUtils.textoPresentePagina(driver, "Update");
		SeleniumUtils.textoPresentePagina(driver, "Selected");
		SeleniumUtils.textoPresentePagina(driver, "Email");
		SeleniumUtils.textoPresentePagina(driver, "Name");
		SeleniumUtils.textoPresentePagina(driver, "Surname");
		textoBoton = driver.findElement(
				By.xpath("//input[@id='delete-button']")).getAttribute("value");
		assertEquals(textoBoton, "Delete Users");

		// Cambiamos otra vez a español 
		PO_NavView.changeIdiom(driver, "Spanish");
		String placeholder = driver.findElement(
				By.xpath("//div[@class='form-group']//input[1]"))
				.getAttribute("placeholder");
		assertEquals(placeholder, "Buscar usuarios por nombre, apellidos o email");
		SeleniumUtils.textoPresentePagina(driver, "Buscar");
		SeleniumUtils.textoPresentePagina(driver, "Usuarios");
		PO_View.checkKey(driver, "users.list.registeredUsers", 
				PO_Properties.getSPANISH());
		SeleniumUtils.textoPresentePagina(driver, "Actualizar");
		SeleniumUtils.textoPresentePagina(driver, "Seleccionado");
		SeleniumUtils.textoPresentePagina(driver, "Correo Electrónico");
		SeleniumUtils.textoPresentePagina(driver, "Nombre");
		SeleniumUtils.textoPresentePagina(driver, "Apellidos");
		textoBoton = driver.findElement(
				By.xpath("//input[@id='delete-button']")).getAttribute("value");
		assertEquals(textoBoton, "Eliminar Usuarios");
	}

	// [prueba28] Intentar acceder sin estar autenticado a la opción de 
	//	  listado de usuarios del administrador. 
	// Se deberá volver al formulario de	  login.

	@Test 
	public void prueba28() { 
		// Nos dirigimos a la página de lista de usuarios sin habernos logueado 
		driver.navigate().to(URL + "/user/list"); 
		//  Comprobamos que no se nos ha dado acceso a esa página
		SeleniumUtils.textoNoPresentePagina(driver, "Usuarios"); 
		// Y que nos ha  llevado al formulario de inicio de sesión 
		PO_View.checkKey(driver,  "login.log", PO_Properties.getSPANISH()); }

	// [prueba29] Intentar acceder sin estar autenticado a la opción de 
	//  listado de ofertas propias de un usuario estándar. 
	// Se deberá volver al  formulario de login.

	@Test 
	public void prueba29() { 
		// Nos dirigimos a la página de lista de  ofertas propias sin loguearnos 
		driver.navigate().to(URL + "/offer/sale"); 
		//  Comprobamos que no se nos ha dado acceso a esa página
		SeleniumUtils.textoNoPresentePagina(driver, "Mis ofertas"); 
		// Y que nos ha  llevado al formulario de inicio de sesión 
		PO_View.checkKey(driver,  "login.log", PO_Properties.getSPANISH()); }

	// [prueba30] Estando autenticado como usuario estándar intentar acceder 
	// a  la opción de listado de usuarios del administrador. 
	// Se deberá indicar un  mensaje de acción prohibida.

	@Test 
	public void prueba30() { 
		// Iniciamos sesión con un usuario estándar
		PO_LoginView.login(driver,"Samu@correo", "123456"); 
		// Nos dirigimos a la  página de lista de usuarios sin habernos logueado 
		driver.navigate().to(URL +  "/user/list"); 
		// Comprobamos que no se nos ha dado acceso a esa página
		SeleniumUtils.textoNoPresentePagina(driver, "Usuarios"); 
		// Y que nos ha  llevado a una pantalla con el texto "Forbidden"
		SeleniumUtils.textoPresentePagina(driver, "Forbidden"); 
	}




	//

	// [Prueba31] Sobre una búsqueda determinada de ofertas, 
	// enviar un mensaje a una oferta concreta. 
	// Se abriría dicha conversación por primera vez. 
	// Comprobar que el mensaje aparece en el listado de mensajes.
	@Test
	public void prueba31() {
		// Iniciamos sesión con un usuario estándar
		PO_LoginView.login(driver,"Samu@correo", "123456"); 
		// Nos dirigimos a buscar ofertas
		driver.navigate().to(URL +  "/offer/list"); 
		// Buscamos la oferta de Ceramica
		PO_ListOffers.search(driver, "Ceramica");
		// Hacemos click en Enviar Mensaje
		WebElement btnMensaje = driver.findElement(By.xpath(
				"//table[@id='tableOffers']/tbody[1]/tr[1]/td[6]/div[1]/a[1]"));
		btnMensaje.click();
		// Escribimos un mensaje y lo enviamos
		WebElement cuadroMsg = driver.findElement(By.xpath(
				"//input[@placeholder='Escribir un mensaje']"));
		cuadroMsg.clear();
		cuadroMsg.click();
		cuadroMsg.sendKeys("¡Hola!");
		WebElement btnEnviar = driver.findElement(By.xpath(
				"//input[@placeholder='Escribir un mensaje']"
				+ "/following-sibling::button[1]"));
		btnEnviar.click();
		// Comprobamos que el mensaje ha desaparecido del cuadro de texto
		// y que ha aparecido como un nuevo bocadillo de chat
		cuadroMsg = driver.findElement(By.xpath(
				"//input[@placeholder='Escribir un mensaje']"));
		String texto = cuadroMsg.getText();
		assertTrue(texto.isEmpty());
		SeleniumUtils.textoPresentePagina(driver, "¡Hola!");
	}

	// [Prueba32] Sobre el listado de conversaciones 
	// enviar un mensaje a una conversación ya abierta.
	// Comprobar que el mensaje aparece en la lista de mensajes
	@Test
	public void prueba32() {
		// Iniciamos sesión con un usuario estándar
		PO_LoginView.login(driver,"Samu@correo", "123456"); 
		// Nos dirigimos a buscar ofertas
		driver.navigate().to(URL +  "/offer/list"); 
		// Buscamos la oferta de Silla
		PO_ListOffers.search(driver, "Silla");
		// Hacemos click en Enviar Mensaje
		WebElement btnMensaje = driver.findElement(By.xpath(
				"//table[@id='tableOffers']/tbody[1]/tr[1]/td[6]/div[1]/a[1]"));
		btnMensaje.click();
		// Comprobamos que hay algún mensaje en la conversación
		SeleniumUtils.textoPresentePagina(driver, 
				"¿En qué año fue confeccionada?");
	}

	@Test 
	public void prueba33() { 
		// Iniciamos sesión con un usuario estándar
		PO_LoginView.login(driver,"taso@email", "123456"); 
		// Nos dirigimos a la  página de lista de usuarios sin habernos logueado 
		driver.navigate().to(URL +  "/conversation/list"); 
		// Comprobamos que no se nos ha dado acceso a esa página
		List<Conversation> convers = 
				conversRepository.findAllByUser("taso@correo");
		for(Conversation c : convers) {

			SeleniumUtils.textoPresentePagina(driver, c.getBuyer().getEmail());
			SeleniumUtils.textoPresentePagina(driver, c.getOffer().getTitle());
		}

	}

	@Test 
	public void prueba34() { 
		// Iniciamos sesión con un usuario estándar
		PO_LoginView.login(driver,"taso@email", "123456"); 
		// Nos dirigimos a la  página de lista de usuarios sin habernos logueado 
		driver.navigate().to(URL +  "/conversation/list"); 
		// Comprobamos que no se nos ha dado acceso a esa página
		List<Conversation> convers = 
				conversRepository.findAllByUser("taso@email");
		Conversation c1 = null;
		for(Conversation c : convers) {
			//el primero que encontramos lo asignamos
			c1 = c;
			SeleniumUtils.textoPresentePagina(driver, c.getBuyer().getEmail());
			SeleniumUtils.textoPresentePagina(driver, c.getOffer().getTitle());
			break;
		}

		WebElement btn = driver.findElement(By.id("delete" + c1.getId()));
		btn.click();
		SeleniumUtils.EsperaCargaPagina(driver, "text", "Conversaciones", 1);
		SeleniumUtils.textoNoPresentePagina(driver, c1.getOffer().getTitle());

	}

	@Test 
	public void prueba35() { 
		// Iniciamos sesión con un usuario estándar
		PO_LoginView.login(driver,"taso@email", "123456"); 
		// Nos dirigimos a la  página de lista de usuarios sin habernos logueado 
		driver.navigate().to(URL +  "/conversation/list"); 
		// Comprobamos que no se nos ha dado acceso a esa página
		List<Conversation> convers = 
				conversRepository.findAllByUser("taso@email");
		Conversation c1 = null;
		for(Conversation c : convers) {
			//nos quedamos con el ultimo que encontremos
			c1 = c;
			SeleniumUtils.textoPresentePagina(driver, c.getBuyer().getEmail());
			SeleniumUtils.textoPresentePagina(driver, c.getOffer().getTitle());

		}
		WebElement btn = driver.findElement(By.id("delete" + c1.getId()));
		btn.click();
		SeleniumUtils.EsperaCargaPagina(driver, "text", "Conversaciones", 1);
		SeleniumUtils.textoNoPresentePagina(driver, c1.getOffer().getTitle());

	}

//	[Prueba36] Al crear una oferta marcar dicha oferta como destacada y a continuación comprobar: i) que
//	aparece en el listado de ofertas destacadas para los usuarios y que el saldo del usuario se actualiza
//	adecuadamente en la vista del ofertante (-20).
	@Test 
	public void prueba36() { 
		// Iniciamos sesión con un usuario estándar
		PO_LoginView.login(driver,"taso@email", "123456"); 
		// Nos dirigimos a la  página de lista de usuarios sin habernos logueado 
		driver.navigate().to(URL +  "/offer/add"); 
		// Comprobamos que no se nos ha dado acceso a esa página

		//guardamos el dinero actual
		User user = usersService.getUserByEmail("taso@email");
		double money = user.getMoney();
		//activamos el checkbox y rellenamos el formulario
		WebElement btn = driver.findElement(By.id("promoted"));
		btn.click();
		PO_AddOfferView.fillForm(driver, "oferta prueba", "detalles", 10);
		user = usersService.getUserByEmail("taso@email");
		//comprobamos que el dinero se ha reducido
		assertEquals(money - 20.0, user.getMoney(), 0.01);
		SeleniumUtils.textoPresentePagina(driver, "" +user.getMoney());

	}

//	[Prueba36] agregamos oferta correctamente a promocionadas
	@Test 
	public void prueba37() { 
		// Iniciamos sesión con un usuario estándar
		PO_LoginView.login(driver,"Samu@correo", "123456"); 
		driver.navigate().to(URL +  "/offer/sale"); 

		//guardamos el dinero actual
		User user = usersService.getUserByEmail("Samu@correo");
		//cogemos una de sus ofertas
		Offer offer = offerService.getOffersForUser(user.getEmail()).get(0);
		//aseguramos que no esta vendida
		int i = 0;
		while(offer.isSold()) {
			offer = offerService.getOffersForUser(user.getEmail()).get(i++);
		}

		double money = user.getMoney();
		//promocionamos la offerta
		System.out.println(offer.getId() + "  " + offer.getTitle());
		WebElement btn = driver.findElement(By.id("promote" + offer.getId()));
		btn.click();
		//volvemos a home
		driver.navigate().to(URL +  "/home"); 
		//comprobamos que tenemos la promocion
		SeleniumUtils.textoPresentePagina(driver, offer.getTitle());
		user = usersService.getUserByEmail("Samu@correo");
		//comprobamos que el dinero se ha reducido
		assertEquals(money - 20.0, user.getMoney(), 0.01);
		SeleniumUtils.textoPresentePagina(driver, "" +user.getMoney());

	}


//	[Prueba36] agregamos oferta correctamente a promocionadas
	@Test 
	public void prueba38() { 
		// Iniciamos sesión con un usuario estándar
		PO_LoginView.login(driver,"prueba38", "123456"); 
		driver.navigate().to(URL +  "/offer/sale"); 

		//guardamos el dinero actual
		User user = usersService.getUserByEmail("prueba38");
		//cogemos una de sus ofertas
		Offer offer = offerService.getOffersForUser(user.getEmail()).get(0);
		//aseguramos que no esta vendida
		int i = 0;
		while(offer.isSold()) {
			offer = offerService.getOffersForUser(user.getEmail()).get(i++);
		}

		double money = user.getMoney();
		//promocionamos la offerta
		System.out.println(offer.getId() + "  " + offer.getTitle());
		WebElement btn = driver.findElement(By.id("promote" + offer.getId()));
		btn.click();
		//comprobamos que no hemos perdido dinero 
		SeleniumUtils.textoPresentePagina(driver, "" + money);

	}
	 */
}