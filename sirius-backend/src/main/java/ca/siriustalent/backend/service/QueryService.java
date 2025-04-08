package ca.siriustalent.backend.service;

import ca.siriustalent.backend.model.entities.LocalUser;
import ca.siriustalent.backend.model.entities.ProductionDay;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class QueryService {

    public List<List<ProductionDay>> groupAndSortProductionDaysByClientId(List<ProductionDay> productionDays, String clientId) {
        Map<String, PriorityQueue<ProductionDay>> groupedMap = groupProductionDaysByClientId(productionDays, clientId);

        List<List<ProductionDay>> result = new ArrayList<>();
        groupedMap.entrySet().stream()
                .sorted((entry1, entry2) -> {
                    LocalDate maxDate1 = entry1.getValue().peek().getDate();
                    LocalDate maxDate2 = entry2.getValue().peek().getDate();
                    return maxDate2.compareTo(maxDate1);
                })
                .forEachOrdered(entry -> result.add(new ArrayList<>(entry.getValue())));

        return result;
    }

    private Map<String, PriorityQueue<ProductionDay>> groupProductionDaysByClientId(List<ProductionDay> productionDays, String clientId) {
        Map<String, PriorityQueue<ProductionDay>> groupedMap = new HashMap<>();

        if (clientId != null) {
            for (ProductionDay productionDay : productionDays) {
                if (productionDay.getClientId().equals(clientId)) {
                    String productionKey = productionDay.getProduction();
                    groupedMap
                            .computeIfAbsent(productionKey, k -> new PriorityQueue<>(Comparator.comparing(ProductionDay::getDate).reversed()))
                            .offer(productionDay);
                }
            }
        } else {
            for (ProductionDay productionDay : productionDays) {
                String productionKey = productionDay.getProduction();
                groupedMap
                        .computeIfAbsent(productionKey, k -> new PriorityQueue<>(Comparator.comparing(ProductionDay::getDate).reversed()))
                        .offer(productionDay);
            }
        }

        return groupedMap;
    }
}
