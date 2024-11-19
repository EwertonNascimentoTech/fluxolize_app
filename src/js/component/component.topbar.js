document.addEventListener("DOMContentLoaded", function() {
    // Função que cria o componente de navegação
    function TopNavComponent() {
        return `
                    <div class="navbar-custom topnav-navbar topnav-navbar-dark">
                <div class="container-fluid">
                    <!-- LOGO -->
                    <a href="" class="topnav-logo">
                            <span class="topnav-logo-lg">
                                <img src="src/images/logo.svg" alt="" height="30">
                            </span>
                        <span class="topnav-logo-sm">
                                <img src="src/images/logo_icon.svg" alt="" height="16">
                            </span>
                    </a>

                    <ul class="list-unstyled topbar-right-menu float-right mb-0">
                        <li class="dropdown notification-list">
                            <a class="nav-link dropdown-toggle nav-user arrow-none mr-0" data-toggle="dropdown"
                               id="topbar-userdrop" href="#" role="button" aria-haspopup="true"
                               aria-expanded="false">
                                    <span class="account-user-avatar">
                                        <img src="../../../public/user.png" alt="user-image"
                                             class="rounded-circle">
                                    </span>
                                <span>
                                        <span class="account-user-name">Ewerton Nascimento</span>
                                        <span class="account-position">Analista de Processos</span>
                                    </span>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right dropdown-menu-animated topbar-dropdown-menu profile-dropdown"
                                 aria-labelledby="topbar-userdrop">
                                <!-- item-->
                                <div class=" dropdown-header noti-title">
                                    <h6 class="text-overflow m-0">Seja bem-vindo !</h6>
                                </div>

                                <!-- item-->
                                <a href="javascript:void(0);" class="dropdown-item notify-item">
                                    <i class="mdi mdi-account-circle mr-1"></i>
                                    <span>Minha Conta</span>
                                </a>

                       
                                <!-- item-->
                                <a href="javascript:void(0);" class="dropdown-item notify-item">
                                    <i class="mdi mdi-lifebuoy mr-1"></i>
                                    <span>Documentação</span>
                                </a>

                                <!-- item-->
                                <a href="javascript:void(0);" class="dropdown-item notify-item">
                                    <i class="mdi mdi-logout mr-1"></i>
                                    <span>Sair</span>
                                </a>

                            </div>
                        </li>

                    </ul>
                    <a class="navbar-toggle" data-toggle="collapse" data-target="#topnav-menu-content">
                        <div class="lines">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </a>
                </div>
            </div>
                `;
    }

    // Renderiza o componente de navegação
    function renderTopNav() {
        const topbar = document.getElementById('topbar');
        topbar.innerHTML = TopNavComponent();
    }

    renderTopNav(); // Chama a função de renderização
});