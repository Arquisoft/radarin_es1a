import java.util.ArrayList;
import java.util.List;

import jdk.jshell.spi.ExecutionControl.NotImplementedException;

public class FriendListManager {


    /**
     * 
     * @param Invitations Lista de invitaciones del usuario
     * @return lista de usuarios que son amigos del dueño de esta lista 
     */
    List<String> getFriends( List<Invitation> Invitations, String userEmail){
        List<String> friends = new ArrayList<>();
        for(Invitation inv : Invitations){
            if(inv.isAccepted()){
                String friend;
                if(inv.getDestinatary().equals(userEmail)){
                    friend = getUser(inv.getRemitent());
                }
                else{
                    friend = getUser(inv.getDestinatary());
                }
                                
                friends.add(friend);
            }
        }
        return friends;
    }

    /**
     * 
     * @param Invitations Lista de invitaciones del usuario
     * @return lista de invitaciones que aun estan pendientes
     */
    List<Invitation> getPendingInvites( List<Invitation> Invitations,  String userEmail){
        List<Invitation> pendingInvites = new ArrayList<>();
        for(Invitation inv : Invitations){
            if(!inv.isAccepted()){
                if(inv.getDestinatary().equals(userEmail)){
                    pendingInvites.add(inv);
                }                                
                pendingInvites.add(inv);
            }
        }
        return pendingInvites;
    }

    

    private String getUser(String remitent) {
        throw new RuntimeException("Not yet Implemented");
    }

    private String getCurrentUser() {
        throw new RuntimeException("Not yet Implemented");
    }
}
